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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
