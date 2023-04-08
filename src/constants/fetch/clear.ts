import api from "../api";

async function fetchClear(authorization: string) {
  try {
    await fetch(api.pathnames.clear, {
      cache: "no-cache",
      headers: { authorization },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchClear;
