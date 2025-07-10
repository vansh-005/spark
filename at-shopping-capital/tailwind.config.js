// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#0071dc",
        brutalYellow: "#FFEB3B",
        brutalPink: "#FF4D8B",
        brutalGray: "#E0E0E0",
      },
      fontFamily: {
        brutal: ["'Fredoka'", "sans-serif"],
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
