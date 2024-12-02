import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import useActiveLink, { navLinks } from "./useActiveLink";
import { useNavigate, useLocation } from "react-router-dom";

// Image
import logo from "../../assets/logo.png";
import UserButton from "./UserButton";

const NavLink = ({ path, text, elementId, isActive, onClick, className }) => (
  <li>
    <a
      href={elementId ? `#${elementId}` : "#!"}
      className={`${className} ${isActive ? "active text-custom-500" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(path, elementId);
      }}
    >
      {text}
    </a>
  </li>
);

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [navClass, setNavClass] = useState("");
  const { activeLink, handleLinkClick } = useActiveLink();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleMenu = () => setIsToggle(!isToggle);

  const scrollToElement = (elementId) => {
    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleNavigation = (path, elementId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: elementId } });
    } else {
      scrollToElement(elementId);
    }
    handleLinkClick(path, elementId);
    setIsToggle(false);
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      scrollToElement(location.state.scrollTo);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const scrollNavigation = () => {
      setNavClass(window.scrollY >= 50 ? "is-sticky" : "");
    };

    window.addEventListener("scroll", scrollNavigation, true);
    return () => window.removeEventListener("scroll", scrollNavigation, true);
  }, []);

  const commonLinkClass = `block text-15 font-medium text-slate-800 transition-all duration-300 ease-linear 
    hover:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500`;

  const desktopLinkClass = `${commonLinkClass} md:inline-block px-4 md:px-3 py-2.5 md:py-0.5`;
  const mobileLinkClass = `${commonLinkClass} px-4 py-2.5`;

  return (
    <nav
      className={`fixed z-50 ${navClass} flex items-center justify-between h-16 top-0 bg-white shadow-md dark:bg-zink-700 navbar w-full
      group-data-[skin=bordered]:shadow-sm group-data-[skin=bordered]:border group-data-[skin=bordered]:border-slate-200 
      group-data-[skin=bordered]:dark:border-zink-500`}
    >
      {/* Logo */}
      <div className="shrink-0 w-1/3 flex justify-start px-4">
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt="Logo" className="h-10 sm:h-10 md:h-12 dark:hidden" />
        </a>
      </div>

      {/* Desktop Menu */}
      <ul
        className="absolute inset-x-0 z-20 items-center hidden py-3 mx-auto bg-white shadow-lg 
        dark:bg-zink-600 dark:md:bg-transparent md:z-0 navbar-menu rounded-b-md md:shadow-none 
        md:flex top-full md:relative md:bg-transparent md:rounded-none md:top-auto md:py-0"
      >
        {navLinks.map((link) => (
          <NavLink key={link.path} {...link} isActive={activeLink === link.path} onClick={handleNavigation} className={desktopLinkClass} />
        ))}
      </ul>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zink-600 shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out ${isToggle ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="py-4">
          {navLinks.map((link) => (
            <NavLink key={link.path} {...link} isActive={activeLink === link.path} onClick={handleNavigation} className={mobileLinkClass} />
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-1/3 flex justify-end px-3">
        <UserButton />
        <div className="md:hidden navbar-toggale-button">
          <button
            type="button"
            className="flex items-center justify-center size-[37.5px] p-0 text-white btn 
              bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 
              hover:border-custom-600 focus:text-white focus:bg-custom-600 
              focus:border-custom-600 focus:ring focus:ring-custom-100 
              active:text-white active:bg-custom-600 active:border-custom-600 
              active:ring active:ring-custom-100 dark:ring-custom-400/20"
            onClick={handleToggleMenu}
          >
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
