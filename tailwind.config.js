const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:  {
        teal: colors.teal,
        palette: {
          prime: 'hsl(172, 67%, 45%)',
          darkCyan: 'hsl(183, 100%, 15%)',
          darkGreyCyan: 'hsl(186, 14%, 43%)',
          lightGreyCyan: 'hsl(185, 41%, 84%)'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
