"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "~/shared/Button";
import useChatManager from "~/store/react/chat/useChatManager";

const NewChat = () => {
  const { chatId, setChatId, setMessages } = useChatManager();
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (chatId) {
          setChatId(null);
          setMessages([]);
        }
        router.push("/chat");
      }}
    >
      <Plus color="white" size={15} /> New Chat
    </Button>
  );
};

export default NewChat;
