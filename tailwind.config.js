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
      };
      addUtilities(newUtilities, ["hover"]);
    },
  ],
};
