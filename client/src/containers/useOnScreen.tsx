import { useRef, useState, useEffect, useCallback } from "react";

const useOnScreen = (rootMargin = "0px") => {
  const observer = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  // disconnect observer on unmount
  useEffect(
    () => () => {
      // @ts-ignore
      if (observer && typeof observer.disconnect === "function") {
        // @ts-ignore
        observer?.disconnect(); // or observer?.disconnect() if ?. is supported
      }
    },
    []
  );

  const observe = useCallback(
    // @ts-ignore
    (element) => {
      // init observer if one doesn't exist
      if (!observer.current)
        // @ts-ignore
        observer.current = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { rootMargin }
        );

      // observe an element
      // @ts-ignore
      if (element) observer.current.observe(element);
    },
    [rootMargin]
  );

  return [isIntersecting, observe];
};

export default useOnScreen;
