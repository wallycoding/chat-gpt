"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageEntity from "~/domain/entities/MessageEntity";
import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";
import { AppDispatch, RootStore } from "~/store/main";
import { actions } from "~/store/reducers/chat/chat.reducer";

const useMessages = (initialMessages?: MessageEntity[]) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!initialMessages) return;
    dispatch(actions.setMessages(initialMessages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessages]);

  const messages = useSelector<RootStore, ChatStateEntity["messages"]>(
    (state) => state.chat.messages
  );

  return messages.length ? messages : initialMessages ?? messages;
};

export default useMessages;
