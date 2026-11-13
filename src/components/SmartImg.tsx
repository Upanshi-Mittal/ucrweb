import React from 'react';

type SmartImgProps = {
  src: string; // URL or relative path (public/assets/...)
  alt: string;
  width: number; // display width in px
  height: number; // display height in px
  className?: string;
};

/**
 * Simple wrapper around a native <img> that adds:
 *  • explicit width/height to avoid CLS
 *  • lazy‑loading (`loading="lazy"`)
 *  • optional Tailwind classes passed via `className`
 */
export const SmartImg: React.FC<SmartImgProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    decoding="async"
    className={className}
    style={{ objectFit: 'cover' }}
  />
);
