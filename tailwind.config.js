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
        lust: '#E72024',
      },
      cursor: {
        'finger': 'url(/cursor.png) 0 17, url(/cursor-left.png) 82 17, pointer',
      }
    },
  },
  plugins: [],
}
