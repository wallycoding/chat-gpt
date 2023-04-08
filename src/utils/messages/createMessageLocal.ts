import MessageEntity from "~/domain/entities/MessageEntity";
import MessageAuthorEnum from "~/domain/enums/MessageAuthorEnum";
import MessageTypeEnum from "~/domain/enums/MessageTypeEnum";

const createMessageLocal = (
  type: MessageTypeEnum,
  text: string
): MessageEntity => ({
  id: String(Math.random()),
  author: MessageAuthorEnum.USER,
  type,
  text,
  images: null,
  updatedAt: new Date().toISOString(),
});

export default createMessageLocal;
