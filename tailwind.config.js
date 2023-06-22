const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/preline/dist/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes:{
        fadeIn:{
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        }
      },
      animation:{
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      textColor:{
        header: 'var(--text-color-primary)',
        paragraph: 'var(--text-color-secondary)',
        label: 'var(--text-color-tertiary)',
      },
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        gray: colors.gray,
        dark: '#22272e',
      },
      width: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      height: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            h4: {
              fontSize: '1.166667em',
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            'ul li::before': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('preline/plugin'),
  ],
}
