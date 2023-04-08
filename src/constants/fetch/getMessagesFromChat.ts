import MessageEntity from "~/domain/entities/MessageEntity";

const getMessagesFromChat = async (id: string, token?: string) => {
  const response = await fetch(
    "http://localhost:3000/api/chat/messages/" + id,
    {
      headers: {
        authorization: token ?? "",
      },
      cache: "no-cache",
    }
  );

  const messages = await response.json();
  return messages as MessageEntity[];
};

export default getMessagesFromChat;
