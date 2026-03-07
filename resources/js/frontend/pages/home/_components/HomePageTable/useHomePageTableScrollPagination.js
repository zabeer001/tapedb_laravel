import { useEffect, useRef } from "react";

const BOTTOM_TRIGGER_PX = 260;
const TOP_TRIGGER_PX = 320;
const REPOSITION_DURATION_MS = 520;

function easeInOutCubic(progress) {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }
  return 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function getMiddleScrollTop() {
  const doc = document.documentElement;
  const viewportHeight = window.innerHeight || 0;
  const maxScrollTop = Math.max(0, doc.scrollHeight - viewportHeight);
  return Math.floor(maxScrollTop / 2);
}

function animateScrollTo(targetScrollTop, durationMs = REPOSITION_DURATION_MS) {
  const startScrollTop = window.scrollY || window.pageYOffset || 0;
  const delta = targetScrollTop - startScrollTop;

  if (Math.abs(delta) < 2) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const easedProgress = easeInOutCubic(progress);
      const nextScrollTop = startScrollTop + delta * easedProgress;

      window.scrollTo(0, nextScrollTop);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    window.requestAnimationFrame(step);
  });
}

export default function useHomePageTableScrollPagination({
  hasNextPage,
  hasPrevPage,
  loading,
  loadNextPage,
  loadPrevPage,
}) {
  const lastScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const isRepositioningRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0;

    const onScroll = () => {
      if (scrollTickingRef.current || isRepositioningRef.current) {
        return;
      }

      scrollTickingRef.current = true;
      window.requestAnimationFrame(() => {
        void (async () => {
          const currentScrollY = window.scrollY || window.pageYOffset || 0;
          const isScrollingDown = currentScrollY > lastScrollYRef.current;
          const doc = document.documentElement;
          const viewportHeight = window.innerHeight || 0;
          const distanceToBottom = doc.scrollHeight - (currentScrollY + viewportHeight);

          if (isScrollingDown && hasNextPage && !loading && distanceToBottom <= BOTTOM_TRIGGER_PX) {
            const didLoadNextPage = await loadNextPage();
            if (didLoadNextPage) {
              await new Promise((resolve) => window.requestAnimationFrame(resolve));
              isRepositioningRef.current = true;
              await animateScrollTo(getMiddleScrollTop());
              isRepositioningRef.current = false;
            }
          } else if (!isScrollingDown && hasPrevPage && !loading && currentScrollY <= TOP_TRIGGER_PX) {
            const didLoadPreviousPage = await loadPrevPage();

            if (didLoadPreviousPage) {
              await new Promise((resolve) => window.requestAnimationFrame(resolve));
              isRepositioningRef.current = true;
              await animateScrollTo(getMiddleScrollTop());
              isRepositioningRef.current = false;
            }
          }

          lastScrollYRef.current = window.scrollY || window.pageYOffset || 0;
        })().finally(() => {
          scrollTickingRef.current = false;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage, hasPrevPage, loadNextPage, loadPrevPage, loading]);
}
