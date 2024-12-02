import { useState, useEffect } from "react";

const navLinks = [
  { path: "/Home", text: "Lịch Chiếu", elementId: "movie-list" },
  { path: "/About", text: "Cụm Rạp", elementId: "cinema-management" },
  { path: "/Blog", text: "Tin Tức", elementId: "blog-tabs" },
  { path: "/App", text: "Ứng Dụng", elementId: "movie-app-download" },
];

const useActiveLink = () => {
  const [activeLink, setActiveLink] = useState("/Home");

  const handleLinkClick = (path, elementId) => {
    setActiveLink(path);
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      navLinks.forEach(({ path, elementId }) => {
        if (elementId) {
          const element = document.getElementById(elementId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
              setActiveLink(path);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeLink, handleLinkClick };
};

export { navLinks };
export default useActiveLink;
