// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // scan everything in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
