import "./index.module.css";

import type { Props } from "./index.types.ts";

const Component = (props: Props) => {
  console.log(props);
  //const mediaRef = useRef<HTMLDivElement>(null);
  //
  //useEffect(() => {
  //  const ctx = gsap.context(() => {
  //    gsap.from(mediaRef.current, {
  //      scale: 1.1,
  //      duration: 1.5,
  //      ease: "power3.out",
  //    });
  //  });
  //
  //  return () => ctx.revert();
  //}, []);

  return (
    <div className="ui-absolute ui-inset-0 ui-overflow-hidden">
      {/*
        mimeType === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="ui-h-full ui-w-full ui-object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={src}
          alt={alt || ""}
          className="ui-h-full ui-w-full ui-object-cover"
        />
      )
      */}
    </div>
  );
};

export { Component as default };
