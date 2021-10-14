module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(76, 90, 105, 0.1)',
      DEFAULT: '0 1px 3px 0 rgba(76, 90, 105, 0.1), 0 1px 2px 0 rgba(76, 90, 105, 0.11)',
      md: '0 4px 6px -1px rgba(76, 90, 105, 0.1), 0 2px 4px -1px rgba(76, 90, 105, 0.11)',
      lg: '0px 16px 24px rgba(76, 90, 105, 0.1)',
      'right-lg': '0px 16px 24px rgba(76, 90, 105, 0.1)',
      xl: '0 20px 25px -5px rgba(76, 90, 105, 0.1), 0 10px 10px -5px rgba(76, 90, 105, 0.07)',
      '2xl': '0 25px 50px -12px rgba(76, 90, 105, 0.15)',
      '3xl': '0 35px 60px -15px rgba(76, 90, 105, 0.2)',
      inner: 'inset 0 2px 4px 0 rgba(76, 90, 105, 0.06)',
      none: 'none',
    },
    fontFamily: {
      'sans': ['Proxima\\ Nova', 'ui-sans-serif', 'system-ui'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation\\ Mono', 'Courier\\ New', 'monospace'],
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
