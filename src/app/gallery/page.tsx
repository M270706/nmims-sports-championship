"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ZoomIn,
  Camera,
  ExternalLink,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import ImageLightbox, { LightboxImage } from "@/components/ui/ImageLightbox";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { TOURNAMENT_CONFIG } from "@/config/tournament";
import { getGalleryImagesAction } from "@/app/actions/gallery";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState("all");

  const initialPhotos: (LightboxImage & { id: string; tag: string })[] = [
    {
      id: "highlight-01",
      src: "/images/gallery/highlight-01-champions.webp",
      alt: "Champions with the trophy",
      caption: "Champions with the trophy",
      tag: "Ceremonies",
    },
    {
      id: "highlight-02",
      src: "/images/gallery/highlight-02-all-campuses-group.webp",
      alt: "All seven campuses together",
      caption: "All seven campuses together",
      tag: "Team Photos",
    },
    {
      id: "highlight-03",
      src: "/images/gallery/highlight-03-campus-captains.webp",
      alt: "Campus captains at the march-past",
      caption: "Campus captains at the march-past",
      tag: "Ceremonies",
    },
    {
      id: "highlight-04",
      src: "/images/gallery/highlight-04-opening-ceremony-anthem.webp",
      alt: "Opening ceremony",
      caption: "Opening ceremony",
      tag: "Ceremonies",
    },
    {
      id: "highlight-05",
      src: "/images/gallery/highlight-05-inauguration.webp",
      alt: "Inauguration",
      caption: "Inauguration",
      tag: "Ceremonies",
    },
    {
      id: "highlight-06",
      src: "/images/gallery/highlight-06-felicitation.webp",
      alt: "Felicitation of dignitaries",
      caption: "Felicitation of dignitaries",
      tag: "Ceremonies",
    },
    {
      id: "highlight-07",
      src: "/images/gallery/highlight-07-trophies.webp",
      alt: "The trophies",
      caption: "The trophies",
      tag: "Ceremonies",
    },
    {
      id: "highlight-08",
      src: "/images/gallery/highlight-08-closing-group.webp",
      alt: "Closing ceremony group",
      caption: "Closing ceremony group",
      tag: "Ceremonies",
    },
    {
      id: "highlight-09",
      src: "/images/gallery/highlight-09-in-the-news.webp",
      alt: "In the News – Punya Nagari",
      caption: "In the News – Punya Nagari",
      credit: "Featured in Punya Nagari, Dhule Edition",
      tag: "In the News",
    },
  ];

  const [photos, setPhotos] = useState(initialPhotos);

  React.useEffect(() => {
    getGalleryImagesAction()
      .then((items) => {
        if (items && items.length > 0) {
          setPhotos(
            items.map((item) => ({
              id: item.id,
              src: item.url,
              alt: item.caption || "Tournament Photo",
              caption: item.caption,
              tag: item.tag || "Ceremonies",
            }))
          );
        }
      })
      .catch((err) => console.error("getGalleryImagesAction error:", err));
  }, []);

  const tags = [
    "all",
    "Ceremonies",
    "Team Photos",
    "Cricket",
    "Football",
    "Basketball",
    "Volleyball",
    "Table Tennis",
    "Lawn Tennis",
    "In the News",
  ];

  const filteredPhotos =
    selectedTag === "all"
      ? photos
      : photos.filter((p) => p.tag === selectedTag);

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Visual Archives"
        title="Tournament Gallery"
        subtitle="Memories in motion: Opening ceremonies, competitive matches, podium celebrations, and distinguished dignitaries at SVKM's NMIMS sports events."
        imageSrc="/images/gallery/highlight-04-opening-ceremony-anthem.webp"
        imageAlt="Opening ceremony"
      />

      <section className="py-12 md:py-16">
        <Container>
          {/* Tags Filter (scrollable on mobile) */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all h-10 ${
                  selectedTag === tag
                    ? "btn-gold shadow-sm font-bold"
                    : "bg-surface text-text-muted hover:text-text-main border border-gold/15"
                }`}
              >
                {tag === "all" ? "All Photos" : tag}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightboxAt(index)}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-gold/20 hover:border-gold hover:shadow-card-hover transition-all duration-300 bg-surface"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-black/90 via-indigo-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg bg-indigo-black/70 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold block mb-1">
                    {photo.tag}
                  </span>
                  <p className="text-sm font-serif font-bold text-text-main leading-snug drop-shadow line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LIGHTBOX MODAL */}
      <ImageLightbox
        images={filteredPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length)
        }
        onPrev={() =>
          setLightboxIndex(
            (prev) =>
              (prev - 1 + filteredPhotos.length) % filteredPhotos.length
          )
        }
      />
    </NavyPatchBackground>
  );
}
