module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'zinc-1000': 'rgb(14 14 16)'
      },
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
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
