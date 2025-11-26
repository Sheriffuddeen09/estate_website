import { useEffect, useRef, useState } from "react";

export default function ImageSlider({ images }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const total = images.length;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex-1 hidden lg:flex overflow-hidden rounded-2xl relative">
      <div
        ref={containerRef}
        className="slides flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Slide"
            className="w-[700px] h-[500px] object-cover rounded-2xl shadow-2xl"
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}
