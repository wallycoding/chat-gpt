import { PayloadAction } from "@reduxjs/toolkit";
import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";
import { initialState } from "./chat.reducer";

export const setChatID = (
  state: ChatStateEntity,
  { payload }: PayloadAction<ChatStateEntity["id"]>
) => {
  state.id = payload;
  return state;
};

export const setChats = (
  state: ChatStateEntity,
  { payload }: PayloadAction<ChatStateEntity["chats"]>
) => {
  state.chats = payload;
  return state;
};

export const setMessages = (
  state: ChatStateEntity,
  { payload }: PayloadAction<ChatStateEntity["messages"]>
) => {
  state.messages = payload;
  return state;
};

export const addChat = (
  state: ChatStateEntity,
  { payload }: PayloadAction<ChatStateEntity["chats"][0]>
) => {
  state.chats.unshift(payload);
  return state;
};

export const addMessage = (
  state: ChatStateEntity,
  { payload }: PayloadAction<ChatStateEntity["messages"][0]>
) => {
  state.messages.unshift(payload);
  return state;
};

export const reset = () => initialState;
