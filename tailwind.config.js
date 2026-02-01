/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B0F19",
          blue: "#1E3A8A",
          light: "#E6F0FF",
          accent: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
}
