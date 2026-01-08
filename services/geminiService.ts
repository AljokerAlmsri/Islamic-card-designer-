
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

export const generateIslamicImage = async (text: string, styleId: string, ratio: AspectRatio = '1:1'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a high-end, artistic, minimalist background for an Islamic wisdom card. 
  NO TEXT IN THE IMAGE. 
  The design should be very professional and clean. 
  Theme keywords: Luxurious dark matte textures, very subtle gold leaf geometric accents, soft atmospheric lighting, sophisticated shadows. 
  Color palette should feel premium (Emerald, Navy, or Charcoal). 
  The mood should be peaceful and spiritual. 
  Format: ${ratio}. Clear space in the middle for text overlay.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: ratio
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Image generation error:", error);
    throw error;
  }
};
