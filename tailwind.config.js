/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        panel: "#141416",
        line: "#2a2723",
        gold: "#c6a45c",
        goldbright: "#e4c98a",
        parchment: "#f3ede1"
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.25em"
      }
    }
  },
  plugins: []
};
