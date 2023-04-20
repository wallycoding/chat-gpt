"use client";
import { Github } from "lucide-react";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";
import BotIcon from "~/components/icons/BotIcon";
import Google from "~/components/icons/GoogleIcon";
import Button from "~/shared/Button";

const Form = () => {
  const signInCallback = (type: BuiltInProviderType) => {
    return () =>
      signIn(type, {
        redirect: true,
        callbackUrl: "/chat",
      });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <BotIcon size={40} />
      <h1 className="text-white font-semibold text-lg">Welcome to ChatGPT</h1>
      <div className="flex flex-col min-w-[300px] gap-3">
        <Button className="justify-center" onClick={signInCallback("google")}>
          <Google /> Sign in with Google
        </Button>
        <Button className="justify-center" onClick={signInCallback("github")}>
          <Github /> Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Form;
