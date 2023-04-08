"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatEntity from "~/domain/entities/ChatEntity";
import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";
import { AppDispatch, RootStore } from "~/store/main";
import { actions } from "~/store/reducers/chat/chat.reducer";

const useChats = (initialChats?: ChatEntity[]) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!initialChats) return;
    dispatch(actions.setChats(initialChats));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChats]);

  const chats = useSelector<RootStore, ChatStateEntity["chats"]>(
    (state) => state.chat.chats
  );

  return chats.length ? chats : initialChats ?? chats;
};

export default useChats;
