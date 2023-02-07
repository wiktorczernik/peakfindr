/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{html,js}',
    './pages/**/*.{html,php}',
    './index.html',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      height: {
        '112': '28rem', //'448px'
        '128': '32rem', //'512px'
        '144': '36rem', //'576px'
        '160': '40rem', //'640px'
        '176': '44rem', //'704px'
        '192': '48rem', //'768px'
      },
      backgroundImage: {
        'paramax-mountain': "url('/assets/img/background.jpg')",
      },
      backdropBlur: {
        'smx': '2px',
      }
    }
  }
}
