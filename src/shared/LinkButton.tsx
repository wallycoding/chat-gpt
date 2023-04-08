"use client";
import Link, { LinkProps } from "next/link";
import { ReactNode, HTMLAttributes } from "react";

interface LinkButtonProps extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  variant?: "outlined" | "text";
  children: ReactNode;
  target?: HTMLAnchorElement["target"];
}

const styles = {
  outlined: "border border-slate-700",
  text: "",
};

const LinkButton = ({ variant, children, ...props }: LinkButtonProps) => {
  return (
    <Link
      className={`flex items-center gap-2 bg-transparent hover:bg-slate-700 text-white font-normal hover:text-white py-3 px-4 hover:border-transparent text-sm rounded ${
        variant ? styles[variant] : styles["outlined"]
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
