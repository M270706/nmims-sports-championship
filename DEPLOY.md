# Production Deployment Guide: SVKM's NMIMS Inter Campus Sports Championship 2026-27

This guide covers deploying the official website to **Render** or **Vercel** and configuring the **Supabase** backend for production.

---

## 1. Supabase Backend Setup

1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Execute the database migrations in order:
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/003_v5_updates.sql`
   - `supabase/migrations/004_v6.sql`
   - `supabase/migrations/005_groups_and_fixes.sql`
   - `supabase/migrations/006_go_live.sql`
4. In Supabase Dashboard, go to **Settings → API** and copy:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys (anon public)**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API Keys (service_role secret)**: `SUPABASE_SERVICE_ROLE_KEY` (MUST NEVER be shared or prefixed with `NEXT_PUBLIC_`)
5. **Supabase Auth URL Configuration**:
   - Go to **Authentication → URL Configuration**.
   - Set **Site URL**: `https://nmimssports.com` (or your chosen production domain).
   - Under **Redirect URLs**, add:
     - `https://nmimssports.com/**`
     - `https://www.nmimssports.com/**`
     - `http://localhost:3000/**` (for local development)
6. **Storage Configuration**:
   - Verify public bucket `gallery` exists with 5 MB file upload limit and allowed MIME types `image/jpeg, image/png, image/webp`.

---

## 2. Render Deployment

The repository includes a `render.yaml` Blueprint for the Next.js Node.js web service.

1. Push the repository's `main` branch to GitHub, including `render.yaml`.
2. Sign in to [Render](https://render.com), select **New → Blueprint**, and connect the GitHub repository.
3. Review the Blueprint. The service is configured in the Singapore region on Render's free plan, with `npm ci && npm run build` and `npm start`.
4. In the Blueprint setup, provide the four prompted environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only secret; never expose it to the browser)
   - `NEXT_PUBLIC_SITE_URL` = `https://nmims-sports-championship.onrender.com` (change this if Render assigns a different service URL)
5. Create the Blueprint and wait for the first deploy. Verify `https://<your-service>.onrender.com/api/health` returns `status: "healthy"`.

Render's free web services can spin down after inactivity and may take time to wake on the next request. For continuously warm availability, change the service to a paid plan in Render; review its current pricing before upgrading. Add the final Render URL to Supabase Auth's allowed redirect URLs and set it as the Supabase Site URL.

## 3. Vercel Deployment

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/nmims-sports-championship.git
   git branch -M main
   git push -u origin main
   ```
2. Open [Vercel](https://vercel.com) and click **"Add New Project"** → **"Import Git Repository"**.
3. Select your repository.
4. Under **Environment Variables**, configure:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<your-project>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
   - `SUPABASE_SERVICE_ROLE_KEY` = `<your-supabase-service-role-key>` (Server-only secret; never exposed to browser)
   - `NEXT_PUBLIC_SITE_URL` = `https://nmimssports.com`
5. Under Build Command, ensure it is `next build --webpack` (default in `package.json`).
6. Click **Deploy**.

---

## 4. Custom Domain & DNS Configuration

1. In your Vercel project dashboard:
   - Navigate to **Settings → Domains**.
   - Add your apex domain: `nmimssports.com` (redirects `www.nmimssports.com` to `nmimssports.com` or vice-versa).
2. Configure DNS records at your registrar (Cloudflare, Namecheap, GoDaddy):
   - **A Record**:
     - Host: `@`
     - Value: `76.76.21.21`
   - **CNAME Record**:
     - Host: `www`
     - Value: `cname.vercel-dns.com`
3. Wait 5–15 minutes for DNS propagation. Vercel will automatically provision SSL/TLS certificates.
4. Verify by navigating to `https://nmimssports.com/api/health`, which should return HTTP 200 with `status: "healthy"`.
