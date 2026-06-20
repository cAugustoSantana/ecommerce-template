/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef1f8",
          100: "#d5ddef",
          200: "#abbde0",
          300: "#7189bd",
          500: "#164780",
          600: "#0F2D6B",
          700: "#0a224f",
          900: "#061428",
        },
        vya: {
          blue: "#0F2D6B",
          yellow: "#F5C518",
          text: "#1A1A2E",
        },
        accent: {
          DEFAULT: "#F5C518",
          hover: "#e0b015",
          foreground: "#0F2D6B",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
