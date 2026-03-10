/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        georgia: ["Georgia", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      colors: {
        grisuno: "#61686C",
        grisdos: "#A9B6B9",
        gristres: "#899093",
        arena: "rgb(226,222,207)",
        griscita: "rgb(244,245,247)",
      },
      keyframes: {
        borderPulse: {
          "0%, 100%": { borderColor: "#d1d5db" } /* gray-300 */,
          "50%": { borderColor: "#c084fc" } /* purple-500 */,
        },
      },
      animation: {
        borderPulse: "borderPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
