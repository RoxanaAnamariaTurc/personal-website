import { base, sizes, variants } from "./Button.css";

type ButtonVariants = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  size = "md",
  ...rest
}: ButtonProps) => {
  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button className={`${base} ${variantClass} ${sizeClass} `} {...rest}>
      Test
    </button>
  );
};
