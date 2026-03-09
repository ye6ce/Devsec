import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2">
      <div className="mb-6 text-pink-500 bg-pink-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
