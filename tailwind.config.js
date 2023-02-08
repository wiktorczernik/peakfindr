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
      backgroundColor: {
        'midnight-100': '#bebce6',
        'midnight-200': '#9391e6',
        'midnight-300': '#6965e0',
        'midnight-400': '#4e49e3',
        'midnight-500': '#3934c9',
        'midnight-600': '#3834ad',
        'midnight-700': '#292691',
        'midnight-800': '#211f6e',
        'midnight-900': '#151354',
      },
      backgroundImage: {
        'paramax-mountain': "url('/peakguesser/assets/img/rysy.jpg')",
      },
      backdropBlur: {
        'smx': '2px',
      }
    }
  }
}
