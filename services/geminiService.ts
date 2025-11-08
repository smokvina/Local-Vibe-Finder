import type { Event } from '../types';
// FIX: Use recommended import for GoogleGenAI instead of accessing it from the window object.
import { GoogleGenAI } from "@google/genai";

// FIX: Use recommended initialization with a named apiKey parameter.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY as string});

export const findLocalVibes = async (city: string): Promise<Event[]> => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    try {
        const prompt = `
            Ti si 'Local Vibe Finder' AI asistent. Tvoj zadatak je pronaći, analizirati i strukturirati SVA lokalna događanja za grad: "${city}". Današnji datum je ${today}.

            Izvrši zadatak u sljedećim fazama:

            **FAZA 0: Otkrivanje Lokalnih Izvora (Meta-Pretraga)**

            Prije nego što kreneš tražiti same događaje, tvoj PRVI i NAJVAŽNIJI zadatak je da se zapitaš: 'Kako lokalni stanovnici u ${city} pronalaze informacije o događanjima?'
            Izvrši ove upite za identifikaciju ključnih, najažurnijih i najtočnijih lokalnih izvora:
            - 'najbolji kalendar događanja ${city}'
            - 'lokalni portali za najavu događaja ${city}'
            - 'gdje pratiti događanja u ${city}'
            - 'kako lokalci pronalaze koncerte, izložbe u ${city}'
            - 'popularni info portali ${city}'
            
            Analiza Izvora: Identificiraj 2-3 najrelevantnija, najažurnija i najtočnija izvora. (Npr., za Split, to bi bio infozona.hr/kalendar ili slični portali, za druge gradove to može biti whatson[Grad].com, lokalni list, ili službena turistička stranica).

            **FAZA 1: Prioritetno Pretraživanje (Identificirani Izvori)**

            Sada pretraži događaje za SVIH 8 KATEGORIJA (Gastro, Tech, Kultura, itd.) s jakim prioritetom na izvore koje si otkrio u FAZI 0. Koristi upite poput: \`site:[identificirani-izvor.hr] koncerti ovaj tjedan\`.

            **FAZA 2: Standardno Pretraživanje (8 Kategorija)**
            
            Izvrši sve postojeće detaljne upite za 8 kategorija kako bi pronašao događaje koji NISU na glavnim portalima.

            1.  **\`PARTIES_CLUBS\` (Top Partyji i Klubovi):**
                *   \`Noćni život ${city} program\`, \`Klubovi ${city} program ovaj vikend\`, \`Gdje van večeras ${city}\`, \`DJ nastupi ${city}\`, \`Techno party ${city}\`, \`Resident Advisor ${city}\`.

            2.  **\`CONCERTS_MUSIC\` (Glazba i Koncerti):**
                *   \`Koncerti ${city} ovaj mjesec\`, \`Glazbena događanja uživo ${city}\`, \`Svirke ${city}\`, \`Najave koncerata ${city}\`, \`Festivali ${city} najave\`, \`Filharmonija ${city} program\`.

            3.  **\`CULTURE_EVENTS\` (Kultura i Manifestacije):**
                *   \`Kazališni program ${city}\`, \`HNK ${city} repertoar\`, \`Izložbe ${city} otvorenje\`, \`Muzeji ${city} program\`, \`Noć muzeja ${city}\`, \`Stand up comedy ${city}\`, \`Kino program ${city}\` (posebno nezavisna kina), \`Pub kvizovi ${city} ovaj tjedan\`, \`Književne večeri ${city}\`.

            4.  **\`SPORT_LEISURE\` (Sport i Rekreacija):**
                *   \`Sportska događanja ${city} ovaj vikend\`, \`Nogometne utakmice ${city}\`, \`Košarka ${city} raspored\`, \`[Ime Lokalnog Kluba] utakmice\`, \`Maraton ${city} prijava\`, \`Rekreativne utrke ${city}\`, \`Planinarska društva ${city} izleti\`, \`Joga u parku ${city}\`.

            5.  **\`GASTRO_FOOD\` (Gastro i Piće):**
                *   \`Gastro festival ${city}\`, \`Food truck festival ${city}\`, \`Dani otvorenih restorana ${city}\`, \`Vinska kušanja ${city}\`, \`Craft beer event ${city}\`, \`Radionice kuhanja ${city}\`, \`Advent kućice ${city} ponuda\`.

            6.  **\`COMMUNITY_FAIRS\` (Zajednica i Sajmovi):**
                *   \`Lokalni sajmovi ${city}\`, \`OPG sajam ${city}\`, \`Buvljak ${city}\`, \`Advent u ${city} program\`, \`Kvartovska fešta ${city}\`, \`Dobrotvorna akcija ${city}\`, \`Sajam antikviteta ${city}\`, \`Dani grada ${city} program\`.

            7.  **\`FAMILY_KIDS\` (Obitelj i Djeca):**
                *   \`Događanja za djecu ${city} vikend\`, \`Kamo s djecom ${city}\`, \`Dječje predstave ${city}\`, \`Lutkarsko kazalište ${city} program\`, \`Kreativne radionice za djecu ${city}\`, \`STEM radionice za djecu ${city}\`, \`Pričaonica ${city} knjižnica\`.

            8.  **\`EDUCATION_TECH\` (Edukacija i Tech):**
                *   \`Tech meetup ${city}\`, \`[Tehnologija npr. React, Python] meetup ${city}\`, \`Poslovne konferencije ${city}\`, \`Networking event ${city}\`, \`Javna predavanja ${city}\`, \`Besplatne radionice ${city} za odrasle\`, \`Hackathon ${city}\`, \`Startup događanja ${city}\`.

            **FAZA 3: "Gerilsko" Pretraživanje (Niche & Underground)**
            
            Identificiraj lokalne manje barove i klubove i pretraži njihove specifične najave, npr: \`Facebook events [Ime Kluba]\`, \`Instagram [Ime Bara] program\`, \`live music barovi ${city}\`, \`jazz nights ${city}\`, \`blues jam ${city}\`, \`open mic night ${city}\`, \`akustična svirka ${city}\`.

            **KONAČNE UPUTE:**
            
            Za SVAKI pronađeni događaj, primijeni **naprednu ekstrakciju entiteta** iz nestrukturiranih izvora. Standardiziraj \`dateTime\` i klasificiraj ga u jednu od 8 kategorija. Dodaj \`timeStatus\` (\`DANAS\`, \`OVOG_TJEDNA\`, \`OVOG_MJESECA\`) i \`rawDate\` ("YYYY-MM-DD").
            
            Vrati **isključivo** JSON objekt koji sadrži ključ 'events' s nizom pronađenih događaja. Nemoj uključivati markdown. Ako nema događaja, vrati: {"events": []}.

            Struktura JSON objekta za svaki događaj mora biti:
            {
              "name": "string",
              "dateTime": "string",
              "address": "string",
              "description": "string",
              "sourceUrl": "string",
              "category": "PARTIES_CLUBS" | "CONCERTS_MUSIC" | "CULTURE_EVENTS" | "SPORT_LEISURE" | "GASTRO_FOOD" | "COMMUNITY_FAIRS" | "FAMILY_KIDS" | "EDUCATION_TECH",
              "vibe": "Underground Vibe", // Opcionalno
              "extraDetails": "string",
              "rawDate": "YYYY-MM-DD", // Obavezno
              "timeStatus": "DANAS" | "OVOG_TJEDNA" | "OVOG_MJESECA" // Obavezno
            }
        `;
        
        // FIX: Use modern ai.models.generateContent API and updated model name.
        const response = await ai.models.generateContent({
            // FIX: Use gemini-2.5-pro as gemini-pro is deprecated.
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                // FIX: Use `googleSearch` instead of `google_search` as per guidelines.
                tools: [{googleSearch: {}}],
            }
        });

        // FIX: Access response text directly from the `.text` property.
        let jsonText = response.text.trim();
        
        // Clean potential markdown fences
        const jsonMatch = jsonText.match(/```(json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[2]) {
            jsonText = jsonMatch[2];
        }
        
        const parsedResult = JSON.parse(jsonText);
        
        if (parsedResult && Array.isArray(parsedResult.events)) {
             return parsedResult.events as Event[];
        }

        return [];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
         if (error instanceof Error && error.message.includes('JSON')) {
             console.error("Gemini response was not valid JSON.");
             throw new Error("Failed to parse the vibe data. The AI's response was not in the expected format.");
        }
        throw new Error("Failed to fetch local vibes. The AI might be taking a break!");
    }
};