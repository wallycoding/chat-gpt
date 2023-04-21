import MessageTypeEnum from "~/domain/enums/MessageTypeEnum";
import api from "../api";
import MessageEntity from "~/domain/entities/MessageEntity";
import ChatEntity from "~/domain/entities/ChatEntity";

interface CreateMessageProps {
  type: MessageTypeEnum;
  text: string;
  chatId: string | null;
  authorization: string;
}

async function fetchCreateMessage({
  type,
  text,
  chatId,
  authorization,
}: CreateMessageProps) {
  try {
    console.log(">>>!", authorization);
    const response = await fetch(api.pathnames.createMessage, {
      method: "POST",
      body: JSON.stringify({ type, text, chatId }),
      cache: "no-cache",
      headers: { authorization },
    });
    return (await response.json()) as {
      message: MessageEntity;
      newChat?: ChatEntity;
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchCreateMessage;
