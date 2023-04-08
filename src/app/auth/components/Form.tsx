"use client";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Button from "~/shared/Button";

const Form = () => {
  const withGithub = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/chat",
    });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <h1 className="text-white font-semibold text-lg">Welcome to ChatGPT</h1>
      <Button onClick={withGithub}>
        <Github /> Sign in with GitHub
      </Button>
    </div>
  );
};

export default Form;
