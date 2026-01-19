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
                            { text: `User Query: ${prompt}` }
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
let abortController = null;

export const sendChatMessage = async (input) => {
  try {
    const client = getAiClient();
    if (!chatSession) {
      chatSession = client.chats.create({
        model: "gemini-2.0-flash",
        history: [], 
      });
    }

    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    const currentSignal = abortController.signal;

    // console.log("Simulating 10s delay...");
    // await new Promise((resolve, reject) => {
    //     const timer = setTimeout(resolve, 10000);
    //     currentSignal.addEventListener('abort', () => {
    //         clearTimeout(timer);
    //         reject(new Error('Aborted'));
    //     });
    // });

    let result = await chatSession.sendMessage({
      message: basePrompt + `\nUser Query: ${input}`
    }, {
      signal: currentSignal
    });

    if (currentSignal.aborted) {
      result = "You've stopped the generation.";
      return result;
    }

    abortController = null;
    const responseText = result.text; 
    return responseText;

  } catch (e) {
    if (e.name === 'AbortError' || e.message === 'Aborted' || (e.message && e.message.includes('aborted'))) {
        console.log("Request aborted by user");
        return "Generation stopped.";
    }
    console.error("Chat Error:", e);
    throw e;
  }
};


export const stopGeneration = () => {
  console.log("Stopping generation...");
  
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
};

export const createAdvisorPrompt =  async (role, formData) => {
  return `
    You are a ${role}. Provide personalized travel recommendations based on user input.

    User Input:
    - Destination: ${formData.destination}
    - Duration: ${formData.duration}
    - Budget: ${formData.budget}
    - Travelers: ${formData.travelers}
    - Interests: ${formData.interests}
  `;
};
