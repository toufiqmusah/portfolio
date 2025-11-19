
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className="relative w-full h-full flex flex-col gap-6">
      
      {/* Main Display Frame - Boxy Swiss Border (Dark Mode) */}
      <div className="relative w-full aspect-video border-4 border-white bg-[#111] overflow-hidden group">
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Hover Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto bg-black border-2 border-white p-2 text-white hover:bg-white hover:text-black transition-colors">
                <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="pointer-events-auto bg-black border-2 border-white p-2 text-white hover:bg-white hover:text-black transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>
        
        {/* Current Counter Badge */}
        <div className="absolute top-0 right-0 bg-white text-black px-3 py-1 text-xs font-bold uppercase border-l-2 border-b-2 border-black">
            {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Box Like Slide Picker - Made much smaller */}
      <div className="w-full flex justify-center items-center h-16">
        <div className="flex items-end gap-4">
            
            {/* Previous Thumbnail */}
            <div 
                onClick={() => goToSlide(prevIndex)}
                className="cursor-pointer transition-all duration-300 transform hover:scale-105 opacity-50 hover:opacity-100"
            >
                <div className="w-8 h-6 md:w-12 md:h-8 border border-gray-600 grayscale hover:grayscale-0">
                    <img src={images[prevIndex]} alt="Prev" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Current Thumbnail (Slightly larger, Opaque, White Border) */}
            <div className="relative z-10 transform scale-105">
                <div className="w-12 h-8 md:w-16 md:h-10 border-2 border-white bg-black p-0.5 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    <img src={images[currentIndex]} alt="Current" className="w-full h-full object-cover" />
                </div>
                {/* Indicator Triangle */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
                                border-l-[4px] border-l-transparent
                                border-r-[4px] border-r-transparent
                                border-t-[4px] border-t-white">
                </div>
            </div>

            {/* Next Thumbnail */}
            <div 
                onClick={() => goToSlide(nextIndex)}
                className="cursor-pointer transition-all duration-300 transform hover:scale-105 opacity-50 hover:opacity-100"
            >
                <div className="w-8 h-6 md:w-12 md:h-8 border border-gray-600 grayscale hover:grayscale-0">
                    <img src={images[nextIndex]} alt="Next" className="w-full h-full object-cover" />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
