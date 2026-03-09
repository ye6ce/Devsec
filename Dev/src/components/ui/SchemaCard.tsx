import React from 'react';
import Iridescence from '../Iridescence';

export default function SchemaCard({ title, description, category, status = '', icon: Icon, isMobile = false }) {
  return (
    <div className={`w-full max-w-xs h-full flex flex-col items-center text-center relative overflow-hidden rounded-3xl bg-black/20 border ${isMobile ? 'border-white/20' : 'border-white/10'} backdrop-blur-sm group hover:border-white/30 transition-colors duration-500`}>
      
      {/* Animated Background */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-50' : 'opacity-30 group-hover:opacity-50'} transition-opacity duration-500`}>
        <Iridescence 
          color={[1, 0.2, 0.6]} 
          speed={isMobile ? 0 : 1.0} 
          amplitude={isMobile ? 0 : 0.1} 
          mouseReact={!isMobile}
        />
      </div>
      
      <div className="p-8 flex justify-center relative z-10 w-full">
        <div className="w-full h-48 flex items-center justify-center relative overflow-hidden">
          
          {/* Feature Icon */}
          {Icon && <Icon size={64} className={`text-white ${isMobile ? '' : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'} z-10`} strokeWidth={1.5} />}
        </div>
      </div>
      
      <div className={`p-6 relative z-10 w-full ${isMobile ? '' : 'bg-gradient-to-t from-black/80 to-transparent'}`}>
        <span className="inline-block px-3 py-1 text-pink-300 text-xs font-medium mb-3 border border-pink-500/30 rounded-full bg-pink-500/10">
          {category}
        </span>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-6 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
