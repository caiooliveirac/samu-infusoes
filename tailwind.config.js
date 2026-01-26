/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medical Dark Mode Palette
        slate: {
            950: '#020617', // Background deep
        },
        cyan: {
            400: '#22d3ee', // Primary accent
        }
      }
    },
  },
  plugins: [],
}
