/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FluidCursor from '../components/FluidCursor';
import NeuroNoise from '../components/NeuroNoise';
import PricingSection from '../components/PricingSection';
import BubbleMenu from '../components/BubbleMenu';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 relative">
      <BubbleMenu 
        useFixedPosition={true} 
        menuBg="linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))" 
        menuContentColor="#ffffff"
        logo={
          <div className="flex items-center gap-2">
            <img src="https://devsec.odoo.com/web/image/1094-18c61224/34d6cb57-e80d-44ef-8e99-a422e71d6cb6.png?height=256" alt="DevSec Logo" className="h-6 w-auto" />
            <span className="text-white font-serif italic text-lg">DevSec</span>
          </div>
        }
        items={[
          {
            label: 'Home',
            href: '/',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: { bgColor: 'rgba(255, 255, 255, 0.2)', textColor: '#ffffff' }
          },
          {
            label: 'Pricing',
            href: '/pricing',
            ariaLabel: 'Pricing',
            rotation: 8,
            hoverStyles: { bgColor: 'rgba(255, 255, 255, 0.2)', textColor: '#ffffff' }
          }
        ]}
      />
      <FluidCursor />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <NeuroNoise hue={330} saturation={1} chroma={0.5} />
      </div>
      
      <div className="relative z-10 pt-24">
        <PricingSection />
      </div>

      <footer className="relative z-10 py-12 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-mono">
        &copy; {new Date().getFullYear()} DevSec &mdash; Crafted for Speed
      </footer>
    </div>
  );
}
