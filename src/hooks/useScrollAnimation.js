import { useEffect, useState } from "react";
import { useSpring } from "framer-motion";

export const useScrollAnimation = (enabled, itemCount, itemWidth = 400) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const scrollRange = itemCount * itemWidth - windowWidth;
      const mousePercent = e.clientX / windowWidth;
      const targetScroll = -mousePercent * scrollRange;

      scrollX.set(targetScroll);

      const newIndex = Math.floor((-targetScroll + 200) / itemWidth);
      setActiveIndex(Math.max(0, Math.min(itemCount - 1, newIndex)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled, itemCount, itemWidth, scrollX]);

  return { scrollX, activeIndex };
};
