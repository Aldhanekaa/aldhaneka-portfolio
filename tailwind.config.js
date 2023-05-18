/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brand: {
          50: '#FFF9ED',
          100: '#F5E6CB',
          150: '#F5F0E6',
          200: '#A8987B',
          300: '#473514',
          350: '#6B5F46',
          400: '#6A85A8',
          500: '#CBDDF5',
          600: '#A86A6A',
          650: '#F5CBCB',
          700: '#6BA86A',
          750: '#CBF5CD',
        },
      },
    },
  },
  plugins: [require('postcss-nesting'), require('@tailwindcss/typography')],
};
