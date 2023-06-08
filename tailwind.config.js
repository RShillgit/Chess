/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "width": {
        "screen-1/2": "50vw"
      },
      "height": {
        "screen-1/2": "50vh",
        "boardHeight": "50vw",
      }
    },
  },
  plugins: [],
}

