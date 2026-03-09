import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-stone-900 pt-32 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 sm:gap-24 mb-32">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-4xl font-ravens text-stone-100 tracking-widest">Ravens Sanctum</h2>
          <p className="text-stone-500 font-serif italic text-lg max-w-md leading-relaxed">
            Forging high-performance vessels for those who command the shadows. A legacy of speed, darkness, and absolute ritual craftsmanship.
          </p>
          <div className="flex gap-6">
            <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 hover:text-white hover:border-stone-500 transition-all cursor-pointer">
              IG
            </div>
            <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 hover:text-white hover:border-stone-500 transition-all cursor-pointer">
              TW
            </div>
            <div className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-600 hover:text-white hover:border-stone-500 transition-all cursor-pointer">
              DS
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase font-bold text-stone-300 tracking-[0.3em]">The Sanctum</h4>
          <ul className="space-y-4 text-sm text-stone-600 font-serif italic">
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Inventory</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Ritual Guide</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Shadow Drops</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Coven Access</li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase font-bold text-stone-300 tracking-[0.3em]">Support</h4>
          <ul className="space-y-4 text-sm text-stone-600 font-serif italic">
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Ritual Status</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Returns</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Sanctum Rules</li>
            <li className="hover:text-stone-300 transition-colors cursor-pointer">Contact Oracle</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:row justify-between items-center gap-8 border-t border-stone-900 pt-16">
        <div className="text-[10px] uppercase text-stone-700 tracking-[0.5em]">
          © 2026 Ravens Sanctum. All Rights Reserved.
        </div>
        <div className="flex gap-8 text-[10px] uppercase text-stone-700 tracking-widest">
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Privacy Sigil</span>
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Terms of Ritual</span>
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
