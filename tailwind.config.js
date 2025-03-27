/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"], 
  theme: {
    extend: {
      backgroundImage: {
        'jordanbg': "url('../images/jordanbg.png')",
        'bg-nike': "url('../images/bg-login.jpg')",
      },
      animation: {
        'rotate': 'rotate 3s ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          '0%': {
            transform: 'rotate(0deg)', 
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
