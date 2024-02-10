/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "color-1": "#0b192f", // dark blue
        "color-2":"#c8d2f1", // faded white
        "color-3":"#60efd2", // mint
        "color-4":"#162b46", // lighter blue
        
      },
      width: {
        120: "37rem",
      },
    },
  },
  plugins: [],
};
