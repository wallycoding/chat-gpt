import { NextResponse } from "next/server";
import prisma from "~/database/prisma";
import getUserFromToken from "~/utils/getUserFromToken";

type Params = {
  id?: string;
};

export async function GET(
  request: Request,
  { params }: PageProps<Params, any>
) {
  const user = await getUserFromToken(request);
  if (!user) return NextResponse.error();
  const messages = await prisma.message.findMany({
    where: {
      chatId: params.id,
    },
    include: {
      images: true,
    },
  });
  return NextResponse.json(messages.reverse());
}
