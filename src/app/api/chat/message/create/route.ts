import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import prisma from "~/database/prisma";
import MessageTypeEnum from "~/domain/enums/MessageTypeEnum";
import getUserFromToken from "~/utils/getUserFromToken";
import MessageAuthorEnum from "~/domain/enums/MessageAuthorEnum";
import { Chat } from "@prisma/client";
import MessageImageEntity from "~/domain/entities/MessageImageEntity";

type MessageJSON = {
  type: MessageTypeEnum;
  text: string;
  chatId?: string;
};

/* 
  Create Message
*/

const getOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return new OpenAIApi(configuration);
};

export async function POST(request: Request) {
  const user = await getUserFromToken(request);
  if (!user) return NextResponse.error();
  const data = (await request.json()) as MessageJSON;

  let newChat: Chat | undefined;
  if (!data.chatId) {
    const profile = await prisma.profile.findUnique({
      where: { email: user.email! },
    });
    newChat = await prisma.chat.create({
      data: { name: data.text.slice(0, 50), ownerId: profile!.id },
    });
    data.chatId = newChat.id;
  }

  let openAiText: string | undefined;
  let images: MessageImageEntity[] | undefined;
  if (data.type === MessageTypeEnum.TEXT) {
    try {
      const completionOpenAiResponse = await getOpenAI().createCompletion({
        model: "text-davinci-003",
        prompt: data.text,
        max_tokens: 300,
        temperature: 0,
      });
      openAiText = completionOpenAiResponse.data.choices[0].text!;
    } catch (error) {
      const message = (error as any).response.data.error.message;
      openAiText = `[MESSAGE_ERROR]: ${message}`;
    }
  } else {
    try {
      const imageOpenAiResponse = await getOpenAI().createImage({
        prompt: data.text,
        n: 2,
        size: "512x512",
        // response_format: "b64_json",
      });
      images = imageOpenAiResponse.data.data.map(({ url: b64_json }) => ({
        image: b64_json!,
      }));
    } catch (error) {
      const message = (error as any).response.data.error.message;
      openAiText = `[MESSAGE_ERROR]: ${message}`;
    }
  }

  await prisma.message.create({
    data: {
      author: MessageAuthorEnum.USER,
      type: MessageTypeEnum.TEXT,
      text: data.text,
      chatId: data.chatId!,
    },
  });

  const message = await prisma.message.create({
    data: {
      author: MessageAuthorEnum.AI,
      type: MessageTypeEnum.TEXT,
      text: openAiText ?? "",
      chatId: data.chatId,
      images: images
        ? {
            createMany: {
              data: images,
            },
          }
        : undefined,
    },
  });

  return NextResponse.json({ message: { ...message, images }, newChat });
}
