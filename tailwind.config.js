/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a60101",
          "primary-focus": "#750101",
          "primary-content": "#fff",

          "secondary": "#000",
          "secondary-focus": "#222",
          "secondary-content": "#fff",

          "base-100": "#000",
          "base-200": "#222",
          "base-300": "#444",
          "base-content": "#fff",
        },
      },
    ],
  }
}

