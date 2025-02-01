import { useEffect, useRef, useState } from "react";

export function ImageGrid({ children }: { children: any }) {
  const [renderedItems, setRenderedItems] = useState<Element[]>([]);
  const ref = useRef(null);
  const dom = new DOMParser().parseFromString(
    children.props.value,
    "text/html"
  );
  const items = Array.from(dom.body.children);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.intersectionRatio === 1) {
        setRenderedItems((prev) => {
          const nextItems = items.slice(prev.length, prev.length + 6);
          return [...prev, ...nextItems];
        });
      }
    });

    ref?.current && observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] grid-flow-row-dense"
        dangerouslySetInnerHTML={{
          __html: renderedItems.map((item) => item.outerHTML).join(""),
        }}
      ></div>
      <div ref={ref}></div>
    </>
  );
}
