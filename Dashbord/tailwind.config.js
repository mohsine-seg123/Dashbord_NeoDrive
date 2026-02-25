export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        /* ✅ MAIN BACKGROUND */
        "bg-main": "#eef2ff",

        /* ✅ SURFACES / CARDS / NAVBAR */
        surface: {
          DEFAULT: "#f9fbfff3",
          avbare: "#F3F6FF",
          hover: "#f2f6ff",
        },

        /* ✅ BORDERS */
        "border-custom": "#d9e2f2",

        /* ✅ TEXT COLORS */
        text: {
          DEFAULT: "#0f172a",
          muted: "#475569",
        },

        /* ✅ PRIMARY (CTA / buttons) */
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          soft: "#dcebff",
        },

        dark: {
          /* BACKGROUNDS */
          bg: "#0b0f19", // Background principal
          "bg-secondary": "#111827",

          /* SURFACES */
          surface: "#1a1d29", // Cards
          "surface-hover": "#1f2937",
          "surface-light": "#252938",

          /* SIDEBAR */
          sidebar: "#13161f",
          "sidebar-hover": "#1a1d29",
          "sidebar-active": "#6366f1",

          /* BORDERS */
          border: "#1f2937",
          "border-light": "#374151",

          /* TEXT */
          text: {
            primary: "#f9fafb",
            secondary: "#9ca3af",
            muted: "#6b7280",
            disabled: "#4b5563",
          },

          /* ACCENTS */
          accent: {
            purple: "#8b5cf6",
            blue: "#3b82f6",
            green: "#10b981",
            red: "#ef4444",
            cyan: "#06b6d4",
          },

          /* PRIMARY BUTTONS */
          primary: {
            DEFAULT: "#6366f1",
            hover: "#818cf8",
            active: "#4f46e5",
            soft: "#312e81",
          },
        },
      },
    },
  },
  plugins: [],
};
