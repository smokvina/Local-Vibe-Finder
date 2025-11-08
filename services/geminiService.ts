import { GoogleGenAI } from "@google/genai";
import type { Event } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const findLocalVibes = async (city: string): Promise<Event[]> => {
    try {
        const prompt = `
            Tvoja uloga je "Local Vibe Finder". Tvoj zadatak je pronaći, ekstrahirati i kategorizirati lokalne događaje za grad: "${city}".

            Slijedi ove korake:
            1.  Koristi Google Search i Google Maps alate za pretragu najnovijih informacija o događajima za nadolazeći tjedan u gradu "${city}". Koristi upite poput "događaji u ${city} ovaj vikend", "noćni život program ${city}", "koncerti u ${city}", "kulturna događanja ${city}".
            2.  Iz rezultata pretrage, za svaki događaj ekstrahiraj: naziv događaja, datum/vrijeme, punu adresu, kratak opis (sažetak od 1-2 rečenice) i izvornu URL adresu.
            3.  Klasificiraj svaki događaj u jednu od točno ovih kategorija: 'PARTIES_CLUBS', 'CONCERTS_MUSIC', 'CULTURE_EVENTS'.
            4.  Vrati **isključivo** JSON objekt koji sadrži ključ 'events' s nizom pronađenih događaja. Nemoj uključivati nikakav tekst, objašnjenja, markdown oznake (poput \`\`\`json) ili sažetke izvan JSON strukture. Ako nema događaja, vrati JSON objekt s praznim nizom za 'events', ovako: {"events": []}.
            Struktura JSON objekta za svaki događaj mora biti:
            {
              "name": "string",
              "dateTime": "string",
              "address": "string",
              "description": "string",
              "sourceUrl": "string",
              "category": "PARTIES_CLUBS" | "CONCERTS_MUSIC" | "CULTURE_EVENTS"
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }, { googleMaps: {} }],
                thinkingConfig: { thinkingBudget: 32768 }
            },
        });
        
        let jsonText = response.text.trim();
        
        // Strip markdown fences if present, as the model might wrap the JSON in them.
        const jsonMatch = jsonText.match(/```(json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[2]) {
            jsonText = jsonMatch[2];
        }
        
        const result = JSON.parse(jsonText);
        
        if (result && Array.isArray(result.events)) {
             return result.events as Event[];
        }

        return [];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
         if (error instanceof Error && error.message.includes('JSON')) {
             console.error("Gemini response was not valid JSON:", (error as any)?.response?.text);
             throw new Error("Failed to parse the vibe data. The AI's response was not in the expected format.");
        }
        throw new Error("Failed to fetch local vibes. The AI might be taking a break!");
    }
};