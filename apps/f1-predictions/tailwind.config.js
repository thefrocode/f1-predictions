const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        lemon: ['Lemon', 'serif'],
        lemonada: ['Lemonada', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      lineHeight: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      width: {
        '1/10': '10%',
      },
    },
  },
  plugins: [],
};
