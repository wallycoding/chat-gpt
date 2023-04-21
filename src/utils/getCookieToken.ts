import { cookies } from "next/headers";
const getCookieToken = () => cookies().get("next-auth.session-token")?.value;
export default getCookieToken;
