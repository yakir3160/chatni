import { GoogleGenAI } from "@google/genai";

import basePrompt from "../basePrompt.js";

let ai = null;

const getAiClient = () => {
    if (!ai) {
        const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
       
        if (!apiKey) {
            console.error("Gemini API Key is missing. Check your .env file.");
        }
        ai = new GoogleGenAI({
            apiKey: apiKey,
        });
    }
    return ai;
};


export const generateText = async (prompt) => {
    try {
        const client = getAiClient();
        const response = await client.models.generateContent({
            model: "gemini-2.0-flash",
                contents: [
                    {
                        parts: [
                            { text: `Configuration: ${basePrompt}\nUser Query: ${prompt}` }
                        ]
                    }
                ]
        });

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(text);
        return text;

    } catch (error) {
        console.error("Error generating text:", error);
        throw error;
    }
};

let chatSession = null;

export const sendChatMessage = async (input) => {
  try {
    const client = getAiClient();
    if (!chatSession) {
      chatSession = client.chats.create({
        model: "gemini-2.0-flash",
        history: [], 
      });
    }
    const result = await chatSession.sendMessage({
      message: input + basePrompt
    
    });
    const responseText = result.text; 
    return responseText;

  } catch (e) {
    console.error("Chat Error:", e);
    throw e;
  }
};