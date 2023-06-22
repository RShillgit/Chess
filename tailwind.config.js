/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "width": {
        "screen-1/2": "90vh"
      },
      "height": {
        "screen-1/2": "50vh",
        "boardHeight": "90vh",
      },
      "dropShadow": {
        "selected-piece": "-5px 5px 5px black"
      },
      "boxShadow": {
        "valid-hover": "0 0 5px 5px limegreen",
        "invalid-hover": "0 0 5px 5px red"
      },
      "gridTemplateRows": {
        "boardRows": "repeat(8, minmax(0, 1fr))"
      }
    },
  },
  plugins: [],
}

