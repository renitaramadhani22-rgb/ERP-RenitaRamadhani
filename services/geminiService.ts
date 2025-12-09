import { GoogleGenAI } from "@google/genai";
import { AIAnalysisResult } from '../types';

// In Vite via define in config, process.env.API_KEY will be replaced by the string value
const apiKey = process.env.API_KEY || '';

// Initialize carefully - if no key, we handle it in the functions
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeFinancialData = async (data: string): Promise<AIAnalysisResult> => {
  if (!ai) {
    return {
      summary: "API Key not configured. Using simulation mode.",
      recommendations: ["Check Vercel Environment Variables", "Add API_KEY to settings"],
      riskLevel: "LOW"
    };
  }

  try {
    const prompt = `
      You are an expert Chief Financial Officer. Analyze the following Journal Entries JSON data and provide a financial health summary, 3 actionable recommendations to improve cash flow or reduce cost, and a risk assessment (LOW, MEDIUM, HIGH).
      
      Data: ${data}

      Return strictly valid JSON in this format:
      {
        "summary": "string",
        "recommendations": ["string", "string", "string"],
        "riskLevel": "LOW" | "MEDIUM" | "HIGH"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Could not generate analysis due to service error.",
      recommendations: ["Check network connection", "Verify data format"],
      riskLevel: "MEDIUM"
    };
  }
};

export const forecastInventory = async (itemName: string, history: string): Promise<string> => {
  if (!ai) return "AI Forecasting unavailable (Missing API Key).";

  try {
    const prompt = `
      You are a Supply Chain expert. Based on the following usage history for item "${itemName}", predict the stock depletion date and suggest a reorder quantity.
      
      History/Context: ${history}

      Keep it concise (max 50 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No forecast available.";
  } catch (error) {
    return "Forecasting service temporarily unavailable.";
  }
};

export const scoreLead = async (leadData: string): Promise<{score: number, reason: string}> => {
  if (!ai) return { score: 50, reason: "Simulation: API Key missing." };

  try {
    const prompt = `
      You are a Sales Director. Evaluate this sales lead based on the data provided. Assign a score from 0 to 100 based on likelihood to close. Provide a one sentence reason.
      
      Lead Data: ${leadData}

      Return JSON: {"score": number, "reason": "string"}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    const result = JSON.parse(response.text || "{}");
    return result.score ? result : { score: 50, reason: "AI Analysis failed to parse." };
  } catch (e) {
    return { score: 0, reason: "Service error." };
  }
};