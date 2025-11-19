
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  name: string;
}

export const Hero: React.FC<HeroProps> = ({ name }) => {
  return (
    <header className="w-full py-8 md:py-12 mb-20">
      
      {/* Top Navigation / Info Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-white pb-6 mb-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">{name}</h1>
          <p className="text-gray-400 font-mono text-sm mt-2">Biomedical Engineer & Data Scientist</p>
        </div>
        
        <div className="mt-6 md:mt-0 text-left md:text-right font-mono text-xs md:text-sm text-gray-300 flex flex-col gap-1">
            <div className="flex items-center gap-2 md:justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Available for Research</span>
            </div>
            <p>UPenn '27 &bull; KNUST '24</p>
        </div>
      </div>

      {/* Main Title - Stacked Swiss Style */}
      <div className="relative mb-12">
        <div className="flex flex-col leading-[0.8]">
          <span className="text-[16vw] font-black tracking-tighter uppercase text-white">
            PORT
          </span>
          <span className="text-[16vw] font-black tracking-tighter uppercase text-transparent stroke-white ml-[8vw]" style={{ WebkitTextStroke: '2px white' }}>
            FOLIO
          </span>
        </div>
      </div>

      {/* Creative Link - Marquee Effect */}
      <a 
        href="https://toufiqmusah.github.io" 
        target="_blank" 
        rel="noreferrer"
        className="block w-full border-y-2 border-white bg-[#111] hover:bg-white hover:text-black transition-colors duration-300 group overflow-hidden py-3 cursor-pointer"
      >
        <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 font-mono font-bold text-lg uppercase tracking-widest">
                    <span>Visit toufiqmusah.github.io</span>
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                </div>
            ))}
        </div>
      </a>
      <style>
        {`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 20s linear infinite;
            width: max-content;
        }
        `}
      </style>

    </header>
  );
};
