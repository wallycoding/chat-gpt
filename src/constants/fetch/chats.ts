import getCookieToken from "~/utils/getCookieToken";
import api from "../api";
import ChatEntity from "~/domain/entities/ChatEntity";

async function fetchChats() {
  try {
    const authorization = getCookieToken()!;
    const response = await fetch(api.pathnames.chats, {
      cache: "no-cache",
      headers: { authorization },
    });
    const chats = await response.json();
    return chats as ChatEntity[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchChats;
