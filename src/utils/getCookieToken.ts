import { cookies } from "next/headers";
const getCookieToken = () => {
  if (process.env.NODE_ENV === "development")
    return cookies().get("next-auth.session-token")?.value;
  else return cookies().get("__Secure-next-auth.session-token")?.value;
};
export default getCookieToken;
