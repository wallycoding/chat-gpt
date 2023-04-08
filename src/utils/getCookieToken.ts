import { cookies } from "next/headers";
const getSessionToken = () => cookies().get("next-auth.session-token")?.value;
export default getSessionToken;
