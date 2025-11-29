// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006400",       // プライマリカラー
        "primary-dark": "#004b00",
        "primary-light": "#e0f0e0",
      },
    },
  },
  plugins: [],
};

export default config;