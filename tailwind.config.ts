export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0A0F29",
          primaryLight: "#141B3C",
          accent: "#4EF1C7",
          accentDark: "#26C19F",
          electricTeal: "#00D1B2",
          primaryDark: "#0A2540",
          secondary: "#09325C",
          background: "#F6F9FB",
          textLight: "#FFFFFF",
          textDark: "#0A2540",
          error: "#FF4D4F",
          success: "#52C41A",
        },
        gray: {
          100: "#F5F7FA",
          200: "#EDF0F5",
          300: "#D3D8E1",
          400: "#A5AEC0",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        status: {
          success: "#22C55E",
          danger: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};
