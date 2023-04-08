"use client";
import { useDispatch, useSelector } from "react-redux";
import ChatEntity from "~/domain/entities/ChatEntity";
import MessageEntity from "~/domain/entities/MessageEntity";
import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";
import { AppDispatch, RootStore } from "~/store/main";
import { actions } from "~/store/reducers/chat/chat.reducer";

const useChatManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chatId = useSelector<RootStore, ChatStateEntity["id"]>(
    (state) => state.chat.id
  );

  const setChatId = (id: ChatStateEntity["id"]) =>
    dispatch(actions.setChatID(id));

  const addMessage = (message: MessageEntity) =>
    dispatch(actions.addMessage(message));

  const addChat = (chat: ChatEntity) => dispatch(actions.addChat(chat));

  const setMessages = (messages: MessageEntity[]) =>
    dispatch(actions.setMessages(messages));

  return {
    chatId,
    addChat,
    addMessage,
    setChatId,
    setMessages,
  };
};

export default useChatManager;
