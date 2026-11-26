import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Gallery() {
  const { lang, weddingConfig, t } = useWedding();
  const { gallery, ui } = weddingConfig;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = selectedPhotoIndex !== null ? gallery[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="relative py-24 px-4 bg-gradient-to-b from-[#1C050B] via-[#24090F] to-[#1C050B]">
      <div className="max-w-4xl mx-auto">
        {/* Header (Clean Single Language) */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
            <Camera className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t(ui.gallerySection.heading)}</span>
          </div>

          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-5xl'} font-bold gold-foil-text tracking-tight`}>
            {t(ui.gallerySection.heading)}
          </h2>

          <p className="font-banglaBody text-xs sm:text-sm text-cream-200/80 mt-2 max-w-lg mx-auto">
            {t(ui.gallerySection.subheading)}
          </p>
        </div>

        {/* 3D Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((item, index) => (
            <TiltCard
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-gold/40 shadow-3d-card bg-[#150307] cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.caption[lang]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/couple-together.webp';
                }}
              />

              {/* Gradient Vignette Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#150307] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-3 sm:p-4">
                <span className="text-[10px] sm:text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                  {item.tag}
                </span>
                <p className="text-xs sm:text-sm text-cream-100 font-banglaBody truncate">
                  {item.caption[lang]}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#0F0205]/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#2B0E14] border border-gold/40 text-gold flex items-center justify-center active:scale-95 z-10"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#2B0E14] border border-gold/40 text-gold flex items-center justify-center active:scale-95 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-2xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden border-2 border-gold shadow-3d-gold bg-[#150307]">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption[lang]}
                className="w-full h-full object-contain max-h-[70vh] mx-auto"
              />
            </div>
            <p className="mt-4 text-sm sm:text-base font-banglaBody text-cream-100 text-center px-4">
              {currentPhoto.caption[lang]}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#2B0E14] border border-gold/40 text-gold flex items-center justify-center active:scale-95 z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
