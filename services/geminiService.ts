
import { GoogleGenAI } from "@google/genai";
import { CONTENT } from "../constants/content";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const sendMessageToDigitalTwin = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
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
