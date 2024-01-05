/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0A2342",
          secondary: "#2CA58D",
          accent: "#84bc9c",
          neutral: "#FE5F55",
          "base-100": "#18191A",
          info: "#ffffff",
          success: "#14532d",
          warning: "#fde047",
          error: "#dc2626",
        },
      },
    ],
  },
  container: {
    center: true,
    padding: "1rem",
    screens: {
      "2xl": "1000px",
    },
  },
  plugins: [require("daisyui")],
};
