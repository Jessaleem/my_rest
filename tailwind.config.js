/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grayBack': '#252127',
        'goldBorder': '#926F34',
      },
      backgroundImage: {
        'menu-bg-image': "url('https://res.cloudinary.com/jessaleem/image/upload/v1664063077/my_restaurant/foto-fuego2_iatijn.jpg')",
        'intro-bg-image': "url('https://res.cloudinary.com/jessaleem/image/upload/v1664081568/my_restaurant/arabescos_bareh4.webp')",
      }
    },
  },
  plugins: [require('@tailwindcss/forms')({strategy: 'class'})],
}
