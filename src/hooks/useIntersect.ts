import { useEffect, useRef, useState } from 'react';

interface UseIntersectProps {
  root?: Document | Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersect = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseIntersectProps): [
  React.Dispatch<React.SetStateAction<React.Ref<unknown>>>,
  IntersectionObserverEntry,
] => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<React.Ref<unknown>>(null);

  const observer = useRef(
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer
    typeof window !== 'undefined' &&
      new window.IntersectionObserver(([entry]) => updateEntry(entry), {
        root,
        rootMargin,
        threshold,
      }),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};

export { useIntersect };
