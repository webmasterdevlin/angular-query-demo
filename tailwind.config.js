/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        sm: '0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        xs: '0 0px 1px hsla(0, 0%, 0%, 0.4)',
      },
      colors: {
        destroy: {
          DEFAULT: '#f44250',
          dark: '#cc3740',
          light: '#ff6d79',
        },
        gray: {
          DEFAULT: '#e3e3e3',
          dark: '#818181',
          light: '#f7f7f7',
        },
        primary: {
          DEFAULT: '#2b63fd',
          dark: '#1a3dbf',
          light: '#7297ff',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
