/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00AEEF",
        primaryText: "#253238",
        secondaryText:"00AEEF"
      },
      letterSpacing: {
        tight3: "-3px",
      },
    },
  },

  // corePlugins: {
  //   preflight: false,
  // },

  plugins: [],
};
