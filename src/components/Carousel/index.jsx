import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    url: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    title: "Lật Mặt 48H",
  },
  {
    url: "http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png",
    title: "Slide 2",
  },
  {
    url: "http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png",
    title: "Slide 3",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Start a new timer
    timerRef.current = setInterval(() => {
      setCurrentIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    startTimer(); // Reset timer
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    startTimer(); // Reset timer
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    startTimer(); // Reset timer
  };

  return (
    <div className="hidden md:block">
      <div className="relative group h-[80vh] w-full pt-16">
        <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="h-full w-full bg-cover bg-center duration-500" />

        {/* Left Arrow */}
        <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <ChevronLeft size={30} onClick={prevSlide} />
        </div>

        {/* Right Arrow */}
        <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <ChevronRight size={30} onClick={nextSlide} />
        </div>

        {/* Dots */}
        <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, slideIndex) => (
            <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`h-3 w-3 cursor-pointer rounded-full ${currentIndex === slideIndex ? "bg-white" : "bg-white/50"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
