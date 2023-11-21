/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addComponents }) {
		  addComponents({
			'.slider-thumb::-webkit-slider-thumb::-webkit-appearance': {
				
				color: 'white',
				appearance: 'none',
				backgroundColor: 'white',
				
			},
			


		  });
		},
	  ],
	  
}

