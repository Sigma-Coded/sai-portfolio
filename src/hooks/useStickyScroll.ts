import { useRef, useEffect, useState } from "react";

interface StickyScrollOptions {
  staggerDelay?: number;
  scale?: boolean;
  fade?: boolean;
}

export const useStickyScroll = (options: StickyScrollOptions = {}) => {
  const { staggerDelay = 0.05, scale = true, fade = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, opacity: 1, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much the element has scrolled past the top
      const scrollProgress = Math.max(0, viewportHeight - rect.top) / viewportHeight;

      // Scale: start at 1, end at 0.95
      const newScale = scale ? 1 - scrollProgress * 0.05 : 1;

      // Opacity: start at 1, end at 0.7
      const newOpacity = fade ? Math.max(0.7, 1 - scrollProgress * 0.3) : 1;

      // Y offset based on stagger
      const newY = scrollProgress * 20;

      setTransform({
        scale: newScale,
        opacity: newOpacity,
        y: newY,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scale, fade]);

  return { ref, transform };
};
