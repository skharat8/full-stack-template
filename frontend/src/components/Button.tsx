import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size,
      onClick,
      disabled,
      className,
      children,
    },
    ref,
  ) => {
    const sizeStyles = {
      small: "px-6 py-3 text-xl mx-auto uppercase",
      medium: "px-12 py-6 text-2xl mx-auto",
      large: "px-20 py-8 text-4xl mx-auto",
    };

    const variantStyles = {
      primary: styles.btnPrimary,
      link: styles.btnLink,
      demo: styles.btnGuestDemo,
      "small-caps": styles.btnSmallCaps,
    };

    const classNames = clsx(
      styles.btnBase,
      size && sizeStyles[size],
      variant && variantStyles[variant],
      className,
    );

    return (
      <button
        // NO_LINT ButtonProps already defines accepted types
        // eslint-disable-next-line react/button-has-type
        type={type}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        className={classNames}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "link" | "demo" | "small-caps";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default Button;
