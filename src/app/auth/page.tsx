import { getServerSession } from "next-auth/next";
import Form from "./components/Form";
import { redirect } from "next/navigation";

const Auth = async () => {
  const session = await getServerSession();
  if (session) redirect("/chat");
  return <Form />;
};

export default Auth;
