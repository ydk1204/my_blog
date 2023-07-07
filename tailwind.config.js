/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
 	  "./components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {
      boxShadow: {
        'head': '0 4px 2px -2px gray',
      }
    },
 },
 plugins: [require("@tailwindcss/typography")],
}

