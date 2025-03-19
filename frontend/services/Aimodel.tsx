import OpenAI from "openai";
import { Alert } from "react-native";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY, // Ensure this is set in .env
});

const chatbot = async (prompt: string) => {
  // console.log("Sending prompt:", prompt);
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-distill-qwen-32b:free",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }, // Ensuring JSON response
    });

    const res = completion.choices[0].message.content;
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      Alert.alert("⚠️ Something went wrong. Please try again.");
    }
  }
};

export default {
  chatbot,
};
