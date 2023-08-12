/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        cust: '4.688rem',
        padd: '1rem',
      },
      colors: {
        art: '#FF0000',
        design: '#EF0E80',
      },
      cursor: {
        'finger': 'url(/cursor-left-s.png) 0 8, url(/cursor-s.png) 41 8, pointer',
      }
    },
  },
  plugins: [],
}
