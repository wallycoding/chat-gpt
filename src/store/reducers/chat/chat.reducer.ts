import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./chat.actions";

import ChatStateEntity from "~/domain/entities/store/ChatStateEntity";

export const initialState: ChatStateEntity = {
  id: null,
  messages: [],
  chats: [],
};

const chat = createSlice<ChatStateEntity, typeof reducers, "chat">({
  name: "chat",
  initialState,
  reducers,
});

export const { actions } = chat;

export default chat.reducer;
