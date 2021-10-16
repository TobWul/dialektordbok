module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Space Mono", "monospace"],
      serif: ["Domine", "serif"],
    },
    extend: {
      padding: {
        page: "10%",
      },
      maxWidth: {
        page: "800px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
