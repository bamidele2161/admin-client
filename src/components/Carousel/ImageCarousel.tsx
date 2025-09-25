import { useEffect, useState, useRef } from "react";
import { carouselImages } from "../../util";
import { motion } from "framer-motion";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = carouselImages.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = image.src;
          img.onload = () => {
            preloadedImages.current[index] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${image.src}`);
            resolve();
          };
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Component is visible again, no need to do anything since images are preloaded
        }
      },
      {
        threshold: 0.1, // 10% visibility triggers the callback
      }
    );

    observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="relative w-full h-[30vh] lg:h-[35vh] xl:h-[40vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center max-w-4xl mx-auto flex flex-col gap-4 justify-center items-center px-4">
            <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 rounded-lg bg-gray-300 animate-pulse" />

            <div className="h-10 md:h-12 w-28 md:w-40 rounded-lg mt-4 bg-gray-300 animate-pulse" />
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-gray-300 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-[30vh] lg:h-[35vh] xl:h-[40vh] overflow-hidden"
    >
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image.src})` }}
          aria-hidden={currentIndex !== index}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-50 flex justify-center items-center px-4">
            <div className="text-center max-w-4xl mx-auto flex flex-col gap-4 justify-center items-center">
              <motion.p
                variants={container}
                initial="hidden"
                animate="visible"
                className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight sm:leading-snug md:leading-normal"
              >
                {image.description.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="border-white border rounded-lg py-3 md:py-4 px-4 md:w-40 w-28 md:text-base text-sm text-center text-white hover:bg-white hover:text-black transition-colors"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
              currentIndex === index
                ? "bg-white w-4 sm:w-6"
                : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
