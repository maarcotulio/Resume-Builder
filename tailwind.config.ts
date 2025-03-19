import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDarkBlue: "#03045E",
        brandMidBlue: "#0077B6",
        brandLightBlue: "#ADE8F4",
      },
    },
  },
  plugins: [],
} satisfies Config;
