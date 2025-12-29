import { style } from "@vanilla-extract/css";
import { colors } from "../../../ui/tokens/theme";

export const shell = style({
  backgroundColor: colors.background.body,
  color: colors.text.primary,
  minHeight: "100vh",
});
