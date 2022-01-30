module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem'
      },
      width: {
        'lamp': '676px'
      },
      gridTemplateColumns: {
        'detail': '1fr 650px',
      }
    },

  },
  plugins: [],
}
