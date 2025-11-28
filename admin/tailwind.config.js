/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "15px",
      },
   
    
      
      colors: {
        'prime': '#044236', 
        'dark-blue':'#020842',
        'sec-color':'#E3F0FF',
        primary: "#1E293B", // Dark Blue
        secondary: "#6366F1", // Indigo
        accent: "#FACC15",
        
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
        "3xl": "1630px", 
      },
      maxWidth: {
        container: "1320px", 
        header: "1630px", 
        "max-991": "730px", 
      },
      fontFamily: {
        axiforma: ['Axiforma Medium'],
        playfair: ["Playfair Display", "serif"],

      },
    },
  },
  plugins: [],
};
