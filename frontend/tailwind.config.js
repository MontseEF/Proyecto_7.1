export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#eef4ff",
          100:"#dbe7ff",
          200:"#bed2ff",
          300:"#91b2ff",
          400:"#5f8cff",
          500:"#3c6df4",
          600:"#2754cf",
          700:"#1f43a6",
          800:"#1b3a8c",
          900:"#152b66",
        },
        accent: {
          50:"#fff7db",
          100:"#ffefb6",
          200:"#ffe37d",
          300:"#ffd23d",
          400:"#ffbf00",
          500:"#ffb300",
          600:"#e69f00",
          700:"#b37c00",
          800:"#865e00",
          900:"#5c4200",
        }
      },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
};
