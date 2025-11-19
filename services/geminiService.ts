
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_TEXT, GEMINI_MODEL_VISION } from '../constants';

// Ensure API key is available
if (!process.env.API_KEY) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const sendChatMessage = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const model = GEMINI_MODEL_TEXT;
    
    let contents = history.map(h => ({
        role: h.role,
        parts: h.parts
    }));
    
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: "You are an AI assistant on Toufiq Musah's portfolio website. Toufiq is a Biomedical Researcher and Engineer specializing in Machine Learning, Deep Learning, and Computer Vision in Medicine. He is studying M.S.E Data Science at UPenn. Answer questions about his research in medical imaging, his projects like Multi-Omic Data Integration, and his background. Keep responses concise, professional, and technically accurate.",
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};

export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string = "Analyze this image."): Promise<string> => {
  try {
    const model = GEMINI_MODEL_VISION;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    };

    const textPart = {
      text: prompt
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [imagePart, textPart]
      }
    });

    return response.text || "I couldn't analyze the image.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
