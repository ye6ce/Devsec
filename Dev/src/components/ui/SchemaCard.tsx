import React from 'react';
import Iridescence from '../Iridescence';
import GlassSurface from '../GlassSurface';

export default function SchemaCard({ title, description, category, status = '', icon: Icon }) {
  return (
    <div className="w-full max-w-xs h-full">
      <GlassSurface
        width={320}
        height={480}
        borderRadius={16}
        borderWidth={0.08}
        brightness={0}
        opacity={1}
        blur={20}
        displace={8}
        saturation={1.5}
        className="relative card-border overflow-hidden rounded-2xl flex flex-col animate-float border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-white/30"
      >
        {/* Inner black background to create the "black center, glass edges" effect */}
        <div className="absolute inset-[12px] bg-zinc-950/95 rounded-xl z-0 pointer-events-none shadow-[0_0_15px_rgba(9,9,11,1)]" />
        
        <div className="p-8 flex justify-center relative z-10">
          <div className="w-full h-48 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
            {/* Animated Iridescence background */}
            <Iridescence className="absolute inset-0" speed={0.5} amplitude={0.05} mouseReact={false} />
            
            {/* Feature Icon */}
            {Icon && <Icon size={64} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" strokeWidth={1.5} />}
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative z-10" />
        <div className="p-6 relative z-10">
          <span className="inline-block px-3 py-1 text-indigo-300 rounded-full text-xs font-medium mb-3 border border-indigo-400/20 bg-indigo-950/20">
            {category}
          </span>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/60 mb-6 leading-relaxed text-sm">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs px-2 py-1 rounded-full border border-white/5 bg-white/5">
              {category}
            </span>
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
