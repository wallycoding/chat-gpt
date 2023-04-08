import getCookieToken from "~/utils/getCookieToken";
import ChatForm from "./components/ChatForm";
import Messages from "./components/Messages";
import { cookies } from "next/headers";

const Chat = () => {
  const token = getCookieToken()!;

  return (
    <main className="relative flex flex-1 flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Messages />
      </div>
      <ChatForm token={token} />
    </main>
  );
};
export default Chat;
