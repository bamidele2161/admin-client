/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // pryColor: { DEFAULT: "#0E0C60", Light: "#F8FBFE" },
        pryColor: { DEFAULT: "#254A76", Light: "#D1E2C4", Lighter: "#E7E7E6" },
        // secColor: "#DBB950",
        secColor: {
          DEFAULT: "#80BBEB ",
          Light: "#E6F2FB",
          Lighter: "#FFEB7F",
        },
        greyColr: "#352F36",
        lightGreyColor: "#777777",
        black: "#000000",
        footer: "#1B2834",
        negative: { DEFAULT: "#EE443F", Light: "#FFF8F8" },
        positive: { DEFAULT: "#25A969", Light: "#F6FCF9" },
        processing: { DEFAULT: "#DBB950", Light: "#FDFCF8" },
      },
      boxShadow: {
        default: "0px 1px 7px 4px rgba(229, 229, 229, 0.2)",
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        spaceGrotesk: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* For Firefox */
          scrollbarWidth: "none",
          /* For Chrome, Safari, and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
