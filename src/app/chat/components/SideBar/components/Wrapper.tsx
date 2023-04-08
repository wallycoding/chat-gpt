"use client";
import { X as CloseIcon, Menu, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useChatManager from "~/store/react/chat/useChatManager";

const Wrapper = ({ children }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { chatId, setChatId, setMessages } = useChatManager();
  const router = useRouter();

  const toggleSideBar = () => {
    const div = ref.current!;
    const hidden = div.classList.contains("left-[-100%]");
    if (hidden) {
      div.classList.remove("left-[-100%]");
      div.classList.add("left-0");
      setTimeout(() => div.classList.add("bg-slate-800/60"), 100);
    } else {
      div.classList.remove("bg-slate-800/60");
      setTimeout(() => {
        div.classList.remove("left-0");
        div.classList.add("left-[-100%]");
      }, 100);
    }
  };

  const newChat = () => {
    if (chatId) {
      setChatId(null);
      setMessages([]);
    }
    router.push("/chat");
  };

  return (
    <>
      <div
        ref={ref}
        className="flex transition-all backdrop-blur-[3px] left-[-100%] items-start h-screen z-50 absolute w-[100%] md:relative md:w-auto md:transition-none md:left-0"
        onClick={toggleSideBar}
      >
        <div className="bg-slate-800 flex h-screen w-[244px] flex-col p-2 backdrop-blur-sm">
          {children}
        </div>
        <button
          onClick={toggleSideBar}
          className="p-2 pr-4 mt-3 bg-slate-800 border-r-[1px] border-y-[1px] border-slate-700 rounded-tr-full rounded-br-full md:hidden"
        >
          <CloseIcon className="animate-pulse" color="white" size={20} />
        </button>
      </div>
      <div className="flex justify-between items-center p-3 z-40 w-full bg-slate-800 md:hidden">
        <button onClick={toggleSideBar}>
          <Menu color="white" />
        </button>
        <h1 className="font-semibold text-md text-white">ChatGPT</h1>
        <button onClick={newChat}>
          <Plus color="white" />
        </button>
      </div>
    </>
  );
}; //w-[80%] max-w-[244px]

export default Wrapper;
