
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
const config = {
    ...require('./src/styles/tailwind')(),
    content: [
        "./src/**/*.{tsx, ts, html}"
    ]
}


module.exports = config


