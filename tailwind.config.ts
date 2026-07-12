import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#18181B",
        primary: "#3B82F6",
        secondary: "#8B5CF6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59, 130, 246, 0.5)",
        "glow-lg": "0 0 80px -20px rgba(139, 92, 246, 0.4)",
        card: "0 8px 32px -8px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(-10%, -10%) rotate(0deg)" },
          "50%": { transform: "translate(10%, 10%) rotate(180deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
        aurora: "aurora 25s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
