/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#af2f64",
      },
    },
  },
  plugins: [require("daisyui")],
};
