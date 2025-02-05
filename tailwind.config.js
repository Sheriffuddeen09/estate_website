/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  keyframes: {
    'open-menu': {
      '0%': { transform: 'scaleY(0)' },
      '80%': { transform: 'scaleY(1.2)' },
      '100%': { transform: 'scaleY(1)' },
    },
  },
  animation: {
    'open-menu': 'open-menu 0.5s ease-in-out forwards',
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    // ...
    scrollbar: ['dark']
}
}