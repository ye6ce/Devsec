import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, ArrowLeft } from 'lucide-react';

const projects = [
  {
    id: 'yasyou',
    name: 'YasYou Store',
    url: 'https://yasyou-store.odoo.com',
    description: 'Premium e-commerce experience built on Odoo.',
    cards: [
      { 
        title: 'Hero Section', 
        type: 'hero', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://yasyou-store.odoo.com?refresh=new' 
      },
      { 
        title: 'Featured Section', 
        type: 'featured', 
        image: 'https://image.thum.io/get/width/1200/crop/3000/noanimate/https://yasyou-store.odoo.com?refresh=new',
        imagePosition: 'object-[50%_75%]'
      },
      { 
        title: 'Product Page', 
        type: 'products', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://yasyou-store.odoo.com/shop?refresh=new' 
      }
    ]
  },
  {
    id: 'gtech',
    name: 'GTech Store',
    url: 'https://gtech-store.odoo.com',
    description: 'Modern tech retail platform with seamless navigation.',
    cards: [
      { 
        title: 'Hero Section', 
        type: 'hero', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://gtech-store.odoo.com' 
      },
      { 
        title: 'Featured Section', 
        type: 'featured', 
        image: 'https://image.thum.io/get/width/1200/crop/3000/noanimate/https://gtech-store.odoo.com',
        imagePosition: 'object-[50%_75%]'
      },
      { 
        title: 'Product Page', 
        type: 'products', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://gtech-store.odoo.com/shop' 
      }
    ]
  },
  {
    id: 'cleat-dz',
    name: 'Cleat DZ',
    url: 'https://cleat-dz.odoo.com',
    description: 'Sports equipment store with dynamic filtering.',
    cards: [
      { 
        title: 'Hero Section', 
        type: 'hero', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://cleat-dz.odoo.com' 
      },
      { 
        title: 'Featured Section', 
        type: 'featured', 
        image: 'https://image.thum.io/get/width/1200/crop/3000/noanimate/https://cleat-dz.odoo.com',
        imagePosition: 'object-[50%_75%]'
      },
      { 
        title: 'Product Page', 
        type: 'products', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://cleat-dz.odoo.com/shop' 
      }
    ]
  },
  {
    id: 'roselia-dz',
    name: 'Roselia DZ',
    url: 'https://roselia-dz.odoo.com',
    description: 'Elegant floral boutique with custom arrangements.',
    cards: [
      { 
        title: 'Hero Section', 
        type: 'hero', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://roselia-dz.odoo.com' 
      },
      { 
        title: 'Featured Section', 
        type: 'featured', 
        image: 'https://image.thum.io/get/width/1200/crop/3000/noanimate/https://roselia-dz.odoo.com',
        imagePosition: 'object-[50%_75%]'
      },
      { 
        title: 'Product Page', 
        type: 'products', 
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://roselia-dz.odoo.com/shop' 
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm uppercase tracking-widest font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <img src="https://devsec.odoo.com/web/image/1094-18c61224/34d6cb57-e80d-44ef-8e99-a422e71d6cb6.png?height=256" alt="DevSec Logo" className="h-6 w-auto invert opacity-80" />
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-6">
            Selected Work
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light">
            A curation of our recent Odoo developments, showcasing tailored designs and robust e-commerce solutions.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.section 
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="relative"
            >
              {/* Project Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.name}</h2>
                  <p className="text-white/50">{project.description}</p>
                </div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group w-fit"
                >
                  <span className="text-sm uppercase tracking-widest">Visit Site</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.cards.map((card, cardIndex) => (
                  <motion.a
                    key={cardIndex}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group relative block overflow-hidden rounded-xl bg-[#111] border border-white/5 hover:border-white/20 transition-colors aspect-[4/3]"
                  >
                    {/* Image Area */}
                    <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={`${project.name} - ${card.title}`}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${card.imagePosition || 'object-top'}`}
                        loading="lazy"
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 mb-2 text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/80">
                        {card.type}
                      </span>
                      <h3 className="text-xl font-medium text-white group-hover:text-[#ff2d95] transition-colors">
                        {card.title}
                      </h3>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-mono border-t border-white/5 mt-20">
        &copy; {new Date().getFullYear()} DevSec &mdash; Crafted for Speed
      </footer>
    </div>
  );
}
