import ChatEntity from "../ChatEntity";
import MessageEntity from "../MessageEntity";

interface ChatStateEntity {
  id: string | null;
  chats: ChatEntity[];
  messages: MessageEntity[];
}
export default ChatStateEntity;
