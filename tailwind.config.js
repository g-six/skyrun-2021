module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      '2xl': '0px 13.3517px 50.069px rgba(73, 97, 117, 0.1)',
    },
    fontFamily: {
      'sans': ['Proxima\\ Nova', 'ui-sans-serif', 'system-ui']
    },
    extend: {
      backgroundSize: theme => ({
        'hero-pattern': 'contain',
      }),
      colors: {
        'regal-blue': '#160364',
        primary: {
          DEFAULT: '#23476B',
          lighter: '#CFE2F5',
          light: '#5E9FBD',
          dark: '#00273F',
        },
        secondary: {
          DEFAULT: '#F15D22',
          dark: '#5028C6',
        },
        fontSize: {
          sm: ['12px', '18px'],
          base: ['16px', '24px'],
          lg: ['20px', '28px'],
          xl: ['24px', '32px'],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
