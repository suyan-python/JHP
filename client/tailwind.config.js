/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brownn: "#795548",
        bluee: "#32b9d9",
        soft: "#FAF3E0",
      },
      backgroundImage: {
        coverr: "url('./src/assets/background/1.jpg')",
      },
    },
  },
  plugins: [],
};
