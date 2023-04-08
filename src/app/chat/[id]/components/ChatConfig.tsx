"use client";
import { ReactNode, useEffect } from "react";
import useChatManager from "~/store/react/chat/useChatManager";

interface ChatConfigProps {
  chatId?: string | null;
  children: ReactNode;
}

const ChatConfig = (props: ChatConfigProps) => {
  const { setChatId } = useChatManager();

  useEffect(() => {
    if (props.chatId) setChatId(props.chatId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chatId]);

  return <>{props.children}</>;
};

export default ChatConfig;
