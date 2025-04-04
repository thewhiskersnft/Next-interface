import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Oxanium: ["Oxanium", "sans-serif"],
      Orbitron: ["Orbitron", "sans-serif"],
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
    fontSize: {
      large: "18px",
      normal: "16px",
      small: "14px",
      xsmall: "12px",
      xxsmall: "10px",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        variant1: "#4D4D4D",
        background: "#222222",
        yellow1: "#FFC83A",
        darkGrey: "#555555",
        lightGrey: "#4D4D4D",
        buttonBlack: "#222222",
        hoverInputBg: "#3f3f3f",
        disabledLink: "#8d8d8d",
        successGreen: "#09A854",
        textGreen: "#09A854",
        loaderBG: "rgba(0,0,0,0.5)",
        modalBG: "#0D0D0D",
        darkText: "#7D7D7D",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        open: {
          "0%": { height: "0px", overflow: "hidden", opacity: "0px" },
          "100%": { height: "80%", overflow: "hidden", opacity: "1px" },
        },
        close: {
          "0%": { height: "50%", overflow: "hidden", opacity: "1px" },
          "100%": { height: "0px", overflow: "hidden", opacity: "0px" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        open: "open 0.2s ease-in-out 1",
        close: "close 0.2s ease-in-out 1",
      },
      dropShadow: {
        whitexl: [
          "0 5px 5px rgba(255, 255, 255, 0.25)",
          "0 15px 17px rgba(255, 255, 255, 0.15)",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
