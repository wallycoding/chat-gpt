import getCookieToken from "~/utils/getCookieToken";
import ChatList from "./components/ChatList";
import ChatSettings from "./components/ChatSettings";
import NewChat from "./components/NewChat";
import fetchChats from "~/constants/fetch/chats";
import Wrapper from "./components/Wrapper";

const SideBar = async () => {
  const chats = await fetchChats();
  const authorization = getCookieToken();
  return (
    <Wrapper>
      <div className="flex flex-1 flex-col gap-1 overflow-auto">
        <NewChat />
        <ChatList chats={chats} />
      </div>
      <ChatSettings token={authorization!} />
    </Wrapper>
  );
};

export default SideBar;
