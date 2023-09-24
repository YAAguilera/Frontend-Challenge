/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens:{
        sm: "200px", //200 a 499
        md: "500px", // 500 a 1023
        lg: "1024px", //1024 a 1279
        xl: "1280px", //1280 a 1439
        xxl: "1440px"
      },
    },
  },
  plugins: [],
}

