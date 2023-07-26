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
    },
  },
  plugins: [],
}
