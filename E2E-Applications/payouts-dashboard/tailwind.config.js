/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#146eb4",
          900: "#0e4f82"
        }, 
        cream : {
          300: "#f7f3e8"
        },
        gray: {
          400: "#9ca3af",
          600: "#4b5563"
        },

        myGray: {
          val: "#D9D9D9"
        },
        myBlack: {
          val: '#374151'
        }
      }
    },
  },
  plugins: [],
}