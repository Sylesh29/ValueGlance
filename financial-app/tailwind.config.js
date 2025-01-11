/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#2563eb",
        background: "#f3f4f6",
        accent: "#ffffff",
      },
    },
  },
  plugins: [],
};
