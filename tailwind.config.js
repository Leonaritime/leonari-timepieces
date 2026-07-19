/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d0e10",       // near-black charcoal, primary background
        panel: "#16181c",     // slightly raised surface
        navy: "#12141d",      // alternate section background
        line: "#2a2c30",      // hairline borders
        ivory: "#f3efe6",     // primary text on dark
        steel: "#9aa0a6",     // secondary text, muted
        champagne: "#c7a66b", // accent — muted, not shiny gold
        champagnebright: "#ddc190"
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.4em"
      },
      maxWidth: {
        prose2: "68rem"
      }
    }
  },
  plugins: []
};
