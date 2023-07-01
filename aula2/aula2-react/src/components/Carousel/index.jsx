import { useState } from "react";

export function Carousel({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  function updateSelectedImage(newI) {
    if (newI < 0) return;
    if (newI >= images.length) return;

    setSelectedImage(newI);
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <button
          onClick={() => updateSelectedImage(selectedImage - 1)}
          className="text-7xl p-3"
        >
          {"<"}
        </button>
        <div className="w-80 h-36 overflow-hidden">
          {images.map(
            (image, i) =>
              selectedImage === i && (
                <img
                  className="w-full h-full object-cover object-center"
                  key={i}
                  src={image.src}
                  alt={image.alt}
                />
              )
          )}
        </div>
        <button
          onClick={() => updateSelectedImage(selectedImage + 1)}
          className="text-7xl p-3"
        >
          {">"}
        </button>
      </div>
      <div className="flex gap-1 mx-auto mt-2">
        {images.map((_img, i) => (
          <button
            className="rounded-full w-8 h-8 bg-slate-500"
            onClick={() => updateSelectedImage(i)}
          >
            {i === selectedImage && (
              <span className="rounded-full m-auto block bg-slate-600 w-6 h-6"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
