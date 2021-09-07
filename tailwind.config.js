module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('https://static.aot.plus/images/bruce-mars-gJtDg6WfMlQ-unsplash.jpg')",
      }),
      backgroundSize: theme => ({
        'hero-pattern': 'contain',
      }),
      colors: {
        'regal-blue': '#160364',
        primary: {
          DEFAULT: '#23476B',
          light: '#5E9FBD',
          dark: '#00273F',
        },
        secondary: {
          DEFAULT: '#7048E8',
          dark: '#5028C6',
        }
      },
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
