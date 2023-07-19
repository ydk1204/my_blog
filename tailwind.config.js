/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
 	  "./components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {
      boxShadow: {
        'headUp': '0 4px 2px -2px gray',
        'headDwon': '0px 4px 8px 3px gray',
        'modal': '0px 2px 6px 1px black',
      },
    },
 },
 plugins: [require("@tailwindcss/typography")],
}

