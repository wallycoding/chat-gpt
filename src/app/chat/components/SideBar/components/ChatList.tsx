"use client";
import { MessageSquare } from "lucide-react";
import ChatEntity from "~/domain/entities/ChatEntity";
import LinkButton from "~/shared/LinkButton";
import useChats from "~/store/react/chat/useChats";

interface ChatListProps {
  chats: ChatEntity[];
}

const ChatList = (props: ChatListProps) => {
  const chats = useChats(props.chats);

  return (
    <div className="flex flex-col h-full gap-2 box-scroll">
      {chats.map((chat) => {
        return (
          <LinkButton key={chat.id} variant="text" href={`/chat/${chat.id}`}>
            <div className="min-w-[18px]">
              <MessageSquare color="white" size={18} />
            </div>
            <div className="truncate">{chat.name}</div>
          </LinkButton>
        );
      })}
    </div>
  );
};

export default ChatList;
