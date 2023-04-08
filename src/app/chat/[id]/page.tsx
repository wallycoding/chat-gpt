import ChatForm from "../components/ChatForm";
import Messages from "../components/Messages";
import getCookieToken from "~/utils/getCookieToken";
import ChatConfig from "./components/ChatConfig";
import getMessagesFromChat from "~/constants/fetch/getMessagesFromChat";

type Params = {
  id: string;
};

export default async function Chat(props: PageProps<Params, any>) {
  const token = getCookieToken();
  const messages = await getMessagesFromChat(props.params.id, token);

  return (
    <main className="relative flex flex-1 flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Messages messages={messages} />
      </div>
      <ChatConfig chatId={props.params.id}>
        <ChatForm token={token} />
      </ChatConfig>
    </main>
  );
}
