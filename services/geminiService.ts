
import { GoogleGenAI } from "@google/genai";
import { CONTENT } from "../constants/content";

let ai: GoogleGenAI | null = null;
const initAI = () => {
  if (!ai) {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};
export const sendMessageToDigitalTwin = async (message: string): Promise<string> => {
  try {
    const client = initAI();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: CONTENT.SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 }, // Fast response preferred for chat
      },
    });

    return response.text || "I am currently syncing with the main neural net. Please try again.";
  } catch (error) {
    console.error("Digital Twin Error:", error);
    return "Connection interrupted. Please use the standard contact form.";
  }
};
