import { slate, white, blue, green as _green, red as _red, yellow as _yellow, orange as _orange, sky as _sky, purple as _purple } from "tailwindcss/colors";

export const content = [
  // "./public/index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  // "./node_modules/simplebar-react/**/*",
  // "./node_modules/apexcharts/**/*",
  // "./node_modules/@fullcalendar/**/*",
  // "./node_modules/swiper/**/*",
  // "./node_modules/prismjs/**/**/*",
  // "./node_modules/flatpickr/**/*",
  // "./node_modules/react-toastify/**/*",
  // "./node_modules/lightbox.js-react/**/*",
];
export const darkMode = ["class", '[data-mode="dark"]'];
export const theme = {
  fontFamily: {
    public: ['"Public Sans", sans-serif'],
    tourney: ['"Tourney", sans-serif'],
    remix: ["remixicon"],
  },
  container: {
    center: true,
  },
  extend: {
    fontSize: {
      sm: "0.8125rem", //13px
      base: "0.875rem", //14px
      15: "0.9375rem", //15px
      16: "1rem", //16px
      "vertical-menu-item-font-size": "0.875rem",
    },
    colors: {
      body: slate[800],
      "body-bg": slate[100],
      "body-bordered": white,

      //sidebar light
      "vertical-menu": white,
      "vertical-menu-border": slate[200],
      "vertical-menu-item": slate[400],
      "vertical-menu-item-hover": blue[500],
      "vertical-menu-item-bg-hover": blue[50],
      "vertical-menu-item-active": blue[500],
      "vertical-menu-item-bg-active": blue[50],
      "vertical-menu-sub-item": slate[400],
      "vertical-menu-sub-item-hover": blue[500],
      "vertical-menu-sub-item-active": blue[500],

      //sidebar dark
      "vertical-menu-dark": slate[900],
      "vertical-menu-border-dark": slate[900],
      "vertical-menu-item-dark": slate[500],
      "vertical-menu-item-hover-dark": blue[500],
      "vertical-menu-item-bg-hover-dark": slate[800],
      "vertical-menu-item-active-dark": blue[500],
      "vertical-menu-item-bg-active-dark": slate[800],
      "vertical-menu-sub-item-dark": slate[500],
      "vertical-menu-sub-item-hover-dark": blue[500],
      "vertical-menu-sub-item-active-dark": blue[500],

      //sidebar brand
      "vertical-menu-brand": blue[900],
      "vertical-menu-border-brand": blue[900],
      "vertical-menu-item-brand": blue[300],
      "vertical-menu-item-hover-brand": blue[50],
      "vertical-menu-item-bg-hover-brand": "#224097",
      "vertical-menu-item-active-brand": blue[50],
      "vertical-menu-item-bg-active-brand": "#224097",
      "vertical-menu-sub-item-brand": "#a4bbfd",
      "vertical-menu-sub-item-hover-brand": blue[50],
      "vertical-menu-sub-item-active-brand": blue[50],

      //sidebar modern
      "vertical-menu-to-modern": blue[900],
      "vertical-menu-form-modern": _green[900],
      "vertical-menu-border-modern": blue[900],
      "vertical-menu-item-modern": "rgba(255, 255, 255, 0.60)",
      "vertical-menu-item-hover-modern": "rgba(255, 255, 255)",
      "vertical-menu-item-bg-hover-modern": "rgba(255, 255, 255, 0.06)",
      "vertical-menu-item-active-modern": blue[50],
      "vertical-menu-item-bg-active-modern": "rgba(255, 255, 255, 0.06)",
      "vertical-menu-sub-item-modern": "rgba(255, 255, 255, 0.50)",
      "vertical-menu-sub-item-hover-modern": white,
      "vertical-menu-sub-item-active-modern": white,

      //TOPBAR
      topbar: white,
      "topbar-border": slate[200],
      "topbar-item": slate[700],
      "topbar-item-hover": slate[800],
      "topbar-item-bg-hover": slate[100],

      "topbar-dark": slate[900],
      "topbar-border-dark": slate[700],
      "topbar-item-dark": slate[400],
      "topbar-item-hover-dark": slate[100],
      "topbar-item-bg-hover-dark": slate[800],

      "topbar-brand": blue[900],
      "topbar-border-brand": blue[800],
      "topbar-item-brand": "#a4bbfd",
      "topbar-item-hover-brand": white,
      "topbar-item-bg-hover-brand": "#224097",

      "topbar-modern": white,

      custom: {
        50: blue[50],
        100: blue[100],
        200: blue[200],
        300: blue[300],
        400: blue[400],
        500: blue[500], // Using Tailwind's color palette
        600: blue[600],
        700: blue[700],
        800: blue[800],
        900: blue[900],
        950: blue[950],
      },
      red: {
        50: _red[50],
        100: _red[100],
        200: _red[200],
        300: _red[300],
        400: _red[400],
        500: _red[500], // Using Tailwind's color palette
        600: _red[600],
        700: _red[700],
        800: _red[800],
        900: _red[900],
        950: _red[950],
      },
      green: {
        50: "#EAFAF7",
        100: "#D2F4EE",
        200: "#A0E8DB",
        300: "#56D7BF",
        400: "#2DBDA3",
        500: "#249782", // Using Tailwind's color palette
        600: "#208875",
        700: "#1C7767",
        800: "#186355",
        900: "#11463C",
        950: "#0B2D27",
      },

      yellow: {
        50: _yellow[50],
        100: _yellow[100],
        200: _yellow[200],
        300: _yellow[300],
        400: _yellow[400],
        500: _yellow[500], // Using Tailwind's color palette
        600: _yellow[600],
        700: _yellow[700],
        800: _yellow[800],
        900: _yellow[900],
        950: _yellow[950],
      },

      orange: {
        50: _orange[50],
        100: _orange[100],
        200: _orange[200],
        300: _orange[300],
        400: _orange[400],
        500: _orange[500], // Using Tailwind's color palette
        600: _orange[600],
        700: _orange[700],
        800: _orange[800],
        900: _orange[900],
        950: _orange[950],
      },

      sky: {
        50: _sky[50],
        100: _sky[100],
        200: _sky[200],
        300: _sky[300],
        400: _sky[400],
        500: _sky[500], // Using Tailwind's color palette
        600: _sky[600],
        700: _sky[700],
        800: _sky[800],
        900: _sky[900],
        950: _sky[950],
      },

      purple: {
        50: _purple[50],
        100: _purple[100],
        200: _purple[200],
        300: _purple[300],
        400: _purple[400],
        500: _purple[500], // Using Tailwind's color palette
        600: _purple[600],
        700: _purple[700],
        800: _purple[800],
        900: _purple[900],
        950: _purple[950],
      },

      zink: {
        50: "#E2EAF3",
        100: "#C8D7E9",
        200: "#92AFD3",
        300: "#5885BC",
        400: "#395F8E",
        500: "#233A57",
        600: "#1C2E45",
        700: "#132337",
        800: "#0F1824",
        900: "#070C12",
        950: "#030507",
      },
    },
    spacing: {
      header: "4.375rem", // 70px
      "vertical-menu": "16.25rem", // 260px
      "vertical-menu-md": "10.3125rem", // 165px
      "vertical-menu-sm": "4.375rem", // 70px
    },
    maxWidth: {
      boxed: "87.5rem", // 1400px
    },
    minHeight: {
      sm: "1650px", // 1650px
    },
    zIndex: {
      drawer: "1050",
    },
    backgroundImage: {
      "auth-pattern": "url('assets/images/auth-bg.jpg')",
      "auth-pattern-dark": "url('assets/images/auth-bg-dark.jpg')",
    },
    animation: {
      icons: "iconsAnimation 50s",
      progress: "progressAnimation 2s",
    },
    keyframes: {
      iconsAnimation: {
        to: { strokeDashoffset: "500" },
      },
      progressAnimation: {
        "0%": {
          width: "0",
        },
      },
    },
    aspectRatio: {
      "1/1": "1 / 1",
      "4/3": "4 / 3",
      "16/9": "16 / 9",
      "21/9": "21 / 9",
    },
    clipPath: {
      triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
  },
};
export const plugins = [
  // require('./plugins/headings.js'),
  // require('./plugins/buttons.js'),
  // require('./plugins/forms.js'),
  // require('./plugins/card.js'),
  // require('./plugins/drawer.js'),
  // //third party libraries
  // require('./plugins/flatpicker.js'),
  // require('./plugins/simplebar.js'),
  // require('./plugins/swiper.js'),
  // require('./plugins/toastify.js'),
  // require('./plugins/dropzone.js'),
  // // require('./plugins/colorpicker.js'),  // instead react-color picker
  // require('./plugins/ckeditor.js'),
  // require('./plugins/apexcharts.js'),
  // require('./plugins/maps.js'), // google-maps-react
  // // require('./plugins/multijs.js'), // instead react-dual-listbox
  // require('./plugins/fullcalendar.js'),
  // require('./plugins/lightbox.js'),
  // require('./plugins/prismjs.js'),
  // //apps pages
  // require('./plugins/apps.js'),
];
