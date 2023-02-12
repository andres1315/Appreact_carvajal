/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,jsx,js}',
    './src/components/**/*.{html,jsx,js}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
