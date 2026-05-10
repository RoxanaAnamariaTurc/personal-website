import { globalStyle } from "@vanilla-extract/css";
import { colors, typography } from "./theme";
globalStyle("body", {
  margin: 0,
  padding: 0,
  backgroundColor: colors.background.body,
  color: colors.text.primary,
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
});

globalStyle("html", {
  scrollBehavior: "smooth",
  fontFamily: typography.fontFamily.heading,
});

globalStyle("a", {
  color: "inherit",
});
