/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        xsm: "0.563rem",
      },
      textColor: {
        primaryColor: "#F9A344",
      },
      borderColor: {
        primaryColor: "#F9A344",
      },
    },
  },
  plugins: [],
};
