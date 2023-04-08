"use client";
import { useDispatch, useSelector } from "react-redux";
import ChatEntity from "~/domain/entities/ChatEntity";
import MessageEntity from "~/domain/entities/MessageEntity";
import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";
import { AppDispatch, RootStore } from "~/store/main";
import { actions } from "~/store/reducers/chat/chat.reducer";

const useClear = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasChats = useSelector<RootStore, boolean>(
    (state) => !!state.chat.chats.length
  );

  const reset = () => dispatch(actions.reset());
  return {
    reset,
    hasChats,
  };
};

export default useClear;
