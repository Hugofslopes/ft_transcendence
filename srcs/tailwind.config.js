/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{html,js,ts}",
    "./frontend/pages/**/*.{html,js,ts}",
    "./frontend/components/**/*.{html,js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
      },
      width: {
        '100': '25rem',    // 400px
        '112': '28rem',    // 448px
        '128': '32rem',    // 512px
        '144': '36rem',    // 576px
        '160': '40rem',    // 640px
        '192': '48rem',    // 768px
        '256': '64rem',    // 1024px
      },
      height: {
        '100': '25rem',    // 400px
        '112': '28rem',    // 448px
        '128': '32rem',    // 512px
        '144': '36rem',    // 576px
        '160': '40rem',    // 640px
        '192': '48rem',    // 768px
        '256': '64rem',    // 1024px
      },
    },
  },
  plugins: [],
}
