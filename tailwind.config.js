module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hover11:hover": {
          opacity: "1",
          WebkitAnimation: "flash 1.5s",
          animation: "flash 1.5s",
        },
        ".grayscale": {
          WebkitFilter: "grayscale(0)",
          filter: "grayscale(0)",
          WebkitTransition: ".2s ease-in-out",
          transition: ".2s ease-in-out",
        },
        ".grayscale:hover": {
          WebkitFilter: "grayscale(100%)",
          filter: "grayscale(100%)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
