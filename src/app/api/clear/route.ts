import { NextResponse } from "next/server";
import prisma from "~/database/prisma";
import getUserFromToken from "~/utils/getUserFromToken";

export const GET = async (req: Request) => {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.error();
  const profile = await prisma.profile.findUnique({
    where: { email: user.email! },
    include: {
      Chat: {
        include: {
          Message: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
  if (!profile) return NextResponse.error();

  for (const chat of profile.Chat) {
    for (const message of chat.Message) {
      if (message.images.length)
        await prisma.imageAI.deleteMany({
          where: {
            messageId: message.id,
          },
        });
    }
    await prisma.message.deleteMany({
      where: {
        chatId: chat.id,
      },
    });
  }
  await prisma.chat.deleteMany({
    where: {
      ownerId: profile.id,
    },
  });

  return NextResponse.json({ status: 200 });
};
