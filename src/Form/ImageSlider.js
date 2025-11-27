import { useEffect, useState } from "react";

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [total]);

  return (
    <div className="relative w-[700px] h-[500px] shadow-2xl overflow-hidden ">
      {/* SLIDES */}
      <div
        className="flex h-full transition-transform shadow-2xl duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full">
            <img
              src={img}
              alt="Slide"
              className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-blue-600 w-3 " : "bg-black"
            } transition-all duration-300`}
          />
        ))}
      </div>

      {/* COUNTER BOX */}
      <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
        {index + 1} / {total}
      </div>
    </div>
  );
}
