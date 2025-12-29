export const colors = {
  background: {
    body: "#0C0F12",
    surface: "#1A1D21",
    surfaceAlt: "#2C3136",
  },
  text: {
    primary: "#FFFFFF",
    muted: "#A7B0BB",
  },
  accent: {
    primary: "#222d41ff",
    secondary: "#8F5CFF",
    highlight: "#54F2C7",
  },
  border: {
    subtle: "#2C3136",
  },
  status: {
    success: "#2ECC71",
    warning: "#F39C12",
    error: "#E74C3C",
  },
};

export const typography = {
  fontFamily: {
    body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "Ubuntu Mono",
  },
  fontSize: {
    body: "1rem", // 16px
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    xxl: "2rem",
    xxxl: "4rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  lineHeight: {
    body: 1.6,
    heading: 1.2,
  },
};

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "68px",
  9: "78px",
};

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "20px",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px rgba(0, 0, 0, 0.15)",
  lg: "0 10px 25px rgba(0, 0, 0, 0.2)",
  xl: "0 20px 40px rgba(0, 0, 0, 0.25)",
  glow: "0 0 20px rgba(84, 242, 199, 0.15)",
  glowHover: "0 0 30px rgba(84, 242, 199, 0.25)",
};

export const cardSizes = {
  sm: {
    width: "280px",
    imageHeight: "160px",
  },
  md: {
    width: "320px",
    imageHeight: "180px",
  },
  lg: {
    width: "360px",
    imageHeight: "200px",
  },
};

export const layout = {
  section: {
    sm: "10vh",
    md: "70vh",
    lg: "90vh",
    full: "100vh",
  },
  container: {
    sm: "600px",
    md: "900px",
    lg: "1200px",
  },
};

export const transitions = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "400ms ease",
};
