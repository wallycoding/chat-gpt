"use client";
import { ReactNode, HTMLAttributes } from "react";

interface ButtonProps {
  variant?: "outlined" | "text";
  disabled?: boolean;
  children: ReactNode;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  className?: string;
}

const styles = {
  outlined: "border border-slate-700",
  text: "",
};

const Button = ({
  className,
  disabled,
  variant,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center gap-2 bg-transparent hover:bg-slate-700 text-white font-normal hover:text-white py-3 px-4 hover:border-transparent text-sm rounded ${
        variant ? styles[variant] : styles["outlined"]
      }${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
