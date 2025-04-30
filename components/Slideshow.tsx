'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SlideshowProps {
  images: string[];
}

export default function Slideshow({ images }: SlideshowProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className='w-full mt-10'>
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden shadow-lg">
      {/* Images */}
          <div className="flex transition-transform duration-500 ease-in-out w-full h-[300px] md:h-[500px]" style={{ transform: `translateX(-${current * 100}%)` }}>
      {images.map((src, idx) => (
        <div key={idx} className="relative w-full h-[300px] md:h-[500px] flex-shrink-0">
          <Image
            src={src}
            alt={`Slide ${idx}`}
            fill
            className="object-cover"
            priority={idx === 0} // Optional: prioritize loading first image
          />
        </div>
      ))}
</div>


      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? 'bg-white' : 'bg-white/50'}`}

          />
        ))}
      </div>
    </div>
    </section>
  );
}
