/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e6ebf3",
          200: "#c9d3e4",
          300: "#9aaac7",
          400: "#6e84a6",
          500: "#4b6588",
          600: "#2f4b6f",
          700: "#21375a",
          800: "#16283f",
          900: "#0f1d2f",
          950: "#0a1320",
        },
        gov: {
          50: "#eef5ff",
          100: "#d8e8ff",
          200: "#b3d1ff",
          300: "#80b2ff",
          400: "#4f8fff",
          500: "#226be8",
          600: "#1b52b5",
          700: "#163f8e",
          800: "#12326f",
          900: "#0e2757",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 29, 47, 0.06), 0 8px 24px rgba(15, 29, 47, 0.08)",
        panel: "0 1px 1px rgba(15, 29, 47, 0.04), 0 12px 40px rgba(15, 29, 47, 0.10)",
      },
      borderRadius: {
        xl2: "1rem",
        control: "0.75rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
