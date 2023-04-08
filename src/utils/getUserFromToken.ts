import { decode } from "next-auth/jwt";

const getUserFromToken = async (request: Request) =>
  await decode({
    secret: process.env.NEXTAUTH_SECRET,
    token: request.headers.get("authorization")!,
  });

export default getUserFromToken;
