/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: {
          bg: '#ff0000',
          text: '#ffffff',
        },
        menu: {
          bg: '#000000',
          text: '#ffffff',
        },
        item: {
          border: '#BADDFE',
          text: '#999999',
          textStrong: '#000000',
          editBg: '#dddddd',
          editText: '#666666',
        },
      },
      spacing: {
        'header': '4rem',
      },
      maxWidth: {
        'app': '38rem',
      },
      fontFamily: {
        'comic': ['"Comic Neue"', 'cursive'],
      }
    },
  },
  plugins: [],
}