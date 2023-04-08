import MessageTypeEnum from "../enums/MessageTypeEnum";
import MessageAuthorEnum from "../enums/MessageAuthorEnum";
import MessageImageEntity from "./MessageImageEntity";

interface MessageEntity {
  id: string;
  author: MessageAuthorEnum;
  type: MessageTypeEnum;
  text?: string;
  images: MessageImageEntity[] | null;
  updatedAt: string;
}

export default MessageEntity;
