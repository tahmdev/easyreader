import { RefObject, useEffect, useState } from "react";

export const useGetVisibleChildren = (
  elementRef: RefObject<Element>,
  observerOptions: IntersectionObserverInit,
  dep: any[] = []
) => {
  const [visibleChildren, setVisibleChildren] = useState<Element[]>([]);

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;
    const children = elementRef.current?.getElementsByTagName("*");
    if (!hasIOSupport || !node || !children) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          setVisibleChildren((prev) => [...prev, target]);
        } else {
          setVisibleChildren((prev) => prev.filter((el) => el !== target));
        }
      });
    }, observerOptions);

    for (let el of children) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      setVisibleChildren([]);
    };
  }, dep);

  return visibleChildren;
};
