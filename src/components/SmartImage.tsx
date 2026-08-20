// src/components/SmartImage.tsx
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  category?: string;
}

export default function SmartImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  category = 'vape'
}: SmartImageProps) {
  // If remote or relative image exists
  const isRemote = src.startsWith('http');
  const isPublicImage = src.startsWith('/images/') || src.endsWith('.webp') || src.endsWith('.avif') || src.endsWith('.png');

  // If standard image path, render Next.js Image
  if (isRemote) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${className}`}>
        <Image
          src={src}
          alt={alt || 'Nicotine Free Vapes Australia Product'}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Elegant luxury styled 4:3 product frame graphic
  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 product-frame ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-900/10 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 shadow-inner">
          <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 rounded border border-emerald-200 dark:border-emerald-800">
          0mg Certified
        </span>
        <span className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-[200px] line-clamp-1 font-medium">
          {alt}
        </span>
      </div>
    </div>
  );
}
