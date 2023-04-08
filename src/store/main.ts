import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chat/chat.reducer";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
