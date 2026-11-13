import { useEffect, useRef } from "react";

/**
 * Calls `onTick` every `delay` ms while the carousel is usable.
 * Pauses while the pointer is over `containerRef`, while it is off-screen,
 * and while the browser tab is hidden. Any change in `resetKey` (e.g. the
 * active index after a manual click/swipe) restarts the countdown.
 */
export default function useAutoplay(containerRef, onTick, { delay = 4000, resetKey } = {}) {
  const tickRef = useRef(onTick);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    tickRef.current = onTick;
  }, [onTick]);

  // Hover + viewport tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = (e) => {
      if (e.pointerType === "mouse") hoveredRef.current = true;
    };
    const onLeave = () => {
      hoveredRef.current = false;
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (observer) observer.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (hoveredRef.current || !visibleRef.current || document.hidden) return;
      tickRef.current?.();
    }, delay);
    return () => window.clearInterval(id);
  }, [delay, resetKey]);
}
