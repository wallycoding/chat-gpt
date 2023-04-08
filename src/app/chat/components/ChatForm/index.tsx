"use client";
import { Send, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import fetchCreateMessage from "~/constants/fetch/createMessage";

import MessageTypeEnum from "~/domain/enums/MessageTypeEnum";
import Loader from "~/shared/Loader";
import useChatManager from "~/store/react/chat/useChatManager";
import createMessageLocal from "~/utils/messages/createMessageLocal";

const ChatForm = ({ token }: { token?: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, addChat, chatId, setChatId } = useChatManager();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const keydownEvent = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter" && event.altKey) {
      event.preventDefault();
      return createNewMessage(MessageTypeEnum.IMAGE);
    }
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      return createNewMessage(MessageTypeEnum.TEXT);
    }
    const textarea = event.target as HTMLTextAreaElement;
    setTimeout(() => {
      textarea.style.cssText = "height:0px";
      textarea.style.cssText = `height: ${textarea.scrollHeight}px`;
    }, 0);
  };

  const createNewMessage = async (type: MessageTypeEnum) => {
    if (!text.trim()) return null;
    addMessage(createMessageLocal(type, text));
    setText("");
    textareaRef.current!.style.cssText = "height: auto";
    setLoading(true);
    const data = await fetchCreateMessage({
      type,
      text,
      chatId,
      authorization: token ?? "",
    });
    if (data) {
      if (!chatId && data.newChat) {
        setChatId(data.newChat.id);
        addChat(data.newChat);
      }
      addMessage(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="absolute w-full bottom-0 flex flex-col pb-4 bg-gradient-to-t to-transparent from-slate-900 backdrop-blur-sm rounded-tr-[40%] rounded-tl-[40%] z-20">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full max-w-2xl mx-auto"
      >
        <div className="flex items-end gap-2 w-full py-3 px-4 bg-slate-800 rounded-md mx-4 mb-4">
          <textarea
            value={text}
            onChange={({ target: { value } }) => setText(value)}
            className="bg- p-0 overflow-hidden m-0 bg-transparent w-full resize-none outline-none h-[24px] text-white"
            rows={1}
            placeholder="Send a message..."
            onKeyDown={keydownEvent}
            ref={textareaRef}
            disabled={loading}
          ></textarea>
          <div className="flex gap-4 items-center">
            {loading ? (
              <Loader size={20} />
            ) : (
              <>
                <button onClick={() => createNewMessage(MessageTypeEnum.IMAGE)}>
                  <ImageIcon color="white" size={18} />
                </button>
                <button onClick={() => createNewMessage(MessageTypeEnum.TEXT)}>
                  <Send color="white" size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </form>
      <div className="flex justify-center w-full max-w-[90%] mx-auto">
        <p className="text-xs text-white text-center">
          This is not the official ChatGPT, it{"'"}s just a clone, to access the
          original{" "}
          <Link
            target="_blank"
            href="https://chat.openai.com/"
            className="underline"
          >
            ChatGPT click here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChatForm;
