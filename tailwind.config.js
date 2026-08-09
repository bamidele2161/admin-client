/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pryColor: { DEFAULT: "#151A22", Light: "#DCE4E8", Lighter: "#ECE9E1" },
        secColor: {
          DEFAULT: "#6F8294",
          Light: "#EEF1F3",
          Lighter: "#F8F7F3",
        },
        greyColr: "#151A22",
        lightGreyColor: "#566170",
        black: "#000000",
        footer: "#1B2834",
        negative: { DEFAULT: "#EE443F", Light: "#FFF8F8" },
        positive: { DEFAULT: "#25A969", Light: "#F6FCF9" },
        processing: { DEFAULT: "#DBB950", Light: "#FDFCF8" },
      },
      boxShadow: {
        default: "0 18px 50px rgba(21, 26, 34, 0.07)",
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
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
