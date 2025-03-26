import type { Config } from "tailwindcss";

export default {
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/partials/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/App/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
			aspectRatio: {
        '2/3': '2 / 3',
        '4/5': '4 / 5',
			},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
