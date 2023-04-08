import { NextResponse } from "next/server";
import prisma from "~/database/prisma";
import getUserFromToken from "~/utils/getUserFromToken";

export async function GET(request: Request) {
  const user = await getUserFromToken(request);
  if (!user) return NextResponse.error();
  const profile = await prisma.profile.findUnique({
    where: {
      email: user.email!,
    },
    select: {
      Chat: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });
  return NextResponse.json(profile?.Chat);
}
