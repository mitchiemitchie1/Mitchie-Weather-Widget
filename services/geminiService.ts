import { GoogleGenAI } from "@google/genai";
import { WeatherData } from "../types";

export const fetchWeatherWithGemini = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Initialize Gemini client lazily to avoid module-level init issues
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // We use Gemini 2.5 Flash with Google Search Grounding to get live data.
    const prompt = `
      I am exactly at Latitude: ${lat}, Longitude: ${lon}.
      Using Google Search, find the current weather for this exact location right now.
      
      I need you to output a response that strictly follows this format (do not use markdown code blocks, just text):
      
      LOCATION: [City Name, Country]
      TEMP: [Current Temperature number only]
      UNIT: [C or F]
      REAL_FEEL: [Real Feel Temperature number only]
      CONDITION: [Short condition description, e.g., Sunny, Rain, Cloudy]
      SUMMARY: [A very short, cute, encouraging sentence about the weather, max 10 words]
      IS_DAY: [true if it is daytime there, false if night]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Parse the text response manually
    const locationMatch = text.match(/LOCATION:\s*(.*)/i);
    const tempMatch = text.match(/TEMP:\s*(-?\d+)/i);
    const unitMatch = text.match(/UNIT:\s*([CF])/i);
    const realFeelMatch = text.match(/REAL_FEEL:\s*(-?\d+)/i);
    const conditionMatch = text.match(/CONDITION:\s*(.*)/i);
    const summaryMatch = text.match(/SUMMARY:\s*(.*)/i);
    const isDayMatch = text.match(/IS_DAY:\s*(true|false)/i);

    const unit = unitMatch ? unitMatch[1] : "C";

    return {
      location: locationMatch ? locationMatch[1].trim() : "Unknown Location",
      temperature: tempMatch ? `${tempMatch[1]}°${unit}` : "--",
      realFeel: realFeelMatch ? `${realFeelMatch[1]}°${unit}` : "--",
      condition: conditionMatch ? conditionMatch[1].trim() : "Checking...",
      description: summaryMatch ? summaryMatch[1].trim() : "Have a wonderful day!",
      isDay: isDayMatch ? isDayMatch[1].toLowerCase() === 'true' : true,
    };

  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Could not fetch weather data. Please try again.");
  }
};