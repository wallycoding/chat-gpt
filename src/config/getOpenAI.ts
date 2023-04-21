import { Configuration, OpenAIApi } from "openai";

const getOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return new OpenAIApi(configuration);
};

export default getOpenAI;
