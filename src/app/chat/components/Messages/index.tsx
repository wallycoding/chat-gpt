"use client";

import { useSession } from "next-auth/react";
import BotIcon from "~/components/icons/BotIcon";
import Image from "next/image";
import { Type, User, Image as ImageIcon } from "lucide-react";
import useMessages from "~/store/react/chat/useMessages";
import MessageAuthorEnum from "~/domain/enums/MessageAuthorEnum";
import MessageTypeEnum from "~/domain/enums/MessageTypeEnum";
import MessageEntity from "~/domain/entities/MessageEntity";

function sanitizeHTML(str: string) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return "&#" + c.charCodeAt(0) + ";";
  });
}

interface MessagesProps {
  messages?: MessageEntity[];
}

const Messages = (props: MessagesProps) => {
  const { data } = useSession();
  const messages = useMessages(props.messages);
  return (
    <div className="flex flex-col-reverse w-full overflow-y-auto max-h-[calc(100vh-50px)] md:max-h-screen pb-40">
      {messages.map(({ id, type, text, images, author }) => {
        const isAiResponse = author === MessageAuthorEnum.AI;
        const bgColor = isAiResponse
          ? "bg-slate-700 border-y-[1px] border-slate-800 "
          : "";
        return (
          <div key={id} className={bgColor + "flex w-full"}>
            <div className="relative flex items-start text-base gap-4 p-4 w-[90%] max-w-2xl mx-auto">
              {!isAiResponse && (
                <div className="bg-slate-700 p-1 absolute top-1/2 left-2 rounded-full z-10">
                  {type === MessageTypeEnum.TEXT ? (
                    <Type size={10} color="white" />
                  ) : (
                    <ImageIcon size={10} color="white" />
                  )}
                </div>
              )}
              {isAiResponse ? (
                <BotIcon />
              ) : (
                <div className="relative h-[32px] w-[32px] bg-slate-800 rounded-sm">
                  <div className="absolute h-[32px] w-[32px]">
                    {data?.user?.image && (
                      <Image
                        src={data?.user?.image}
                        height={32}
                        width={32}
                        className="rounded-sm"
                        alt="Photo Profile"
                      />
                    )}
                  </div>
                  <div className="h-full w-full flex items-center justify-center ">
                    <User size={18} color="white" />
                  </div>
                </div>
              )}
              {text && (
                <p
                  className="text-white w-full"
                  style={{ wordWrap: "break-word" }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(text.trim()).replaceAll(
                      "&#10;",
                      "<br />"
                    ),
                  }}
                ></p>
              )}
              {!!(images && images.length) && (
                <div className="flex gap-4 w-full">
                  {images.map(({ image }, i) => {
                    return (
                      <div
                        key={i}
                        className="relative pr-[50%] pb-[50%] bg-slate-800 opacity-75 rounded-lg overflow-hidden"
                      >
                        <div className="absolute w-full h-full grid place-items-center">
                          <ImageIcon size="20%" className="text-slate-300" />
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="absolute" src={image} alt="AI image" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
