"use client";
import { Trash, Github, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import fetchClear from "~/constants/fetch/clear";
import Button from "~/shared/Button";
import LinkButton from "~/shared/LinkButton";
import Loader from "~/shared/Loader";
import useClear from "~/store/react/chat/useClear";

const ChatSettings = ({ token }: { token: string }) => {
  const router = useRouter();
  const { hasChats, reset } = useClear();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-1 min-h-[150px] mt-2">
      <hr className="border-slate-400" />
      {hasChats && (
        <Button
          disabled={loading}
          variant="text"
          onClick={async () => {
            if (!hasChats) return;
            setLoading(true);
            await fetchClear(token);
            reset();
            setLoading(false);
            router.push("/chat");
          }}
        >
          {loading ? (
            <>
              <Loader size={15} /> Deleting...
            </>
          ) : (
            <>
              <Trash color="white" size={15} /> Clear conversations
            </>
          )}
        </Button>
      )}
      <LinkButton
        target="_blank"
        variant="text"
        href="https://github.com/wallycoding"
      >
        <Github color="white" size={15} /> GitHub
      </LinkButton>
      <Button variant="text" onClick={() => signOut()}>
        <LogOut color="white" size={15} /> Log out
      </Button>
    </div>
  );
};

export default ChatSettings;
