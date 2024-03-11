import {
  Astro,
  Cometh,
  ComethDirection,
  Polyanet,
  Soloon,
  SoloonColor,
} from "../types/astros";
import { delay } from "../utils/utils";

// Function to create an astral object invoking the Megaverse API
export async function createAstralObject<T extends Astro>(
  astro: T
): Promise<boolean> {
  console.warn(`Creating a ${astro.apiName} at ${astro.row}, ${astro.column}`);

  const apiUrl = process.env.API_URL;
  const candidateId = process.env.CANDIDATE_ID;

  // Check for required environment variables
  if (!apiUrl || !candidateId) {
    console.error(
      "API URL or Candidate ID is not set in environment variables."
    );
    return false;
  }

  const url = `${apiUrl}/${astro.apiName}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...astro,
        candidateId,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log("-- Astro created successfully");
    return true;
  } catch (error) {
    console.error("Error creating astral object:", error);
    return false;
  }
}

// Function to parse a string representation of an Astro object into the correct instance
export function parseAstro(item: string, row: number, column: number): Astro {
  let astroType: string,
    modifier: string = "";
  if (item.includes("_")) {
    [modifier, astroType] = item.split("_");
  } else {
    astroType = item;
  }

  // Return an instance of the appropriate class based on the astro type
  switch (astroType.toUpperCase()) {
    case "POLYANET":
      return new Polyanet(row, column);
    case "COMETH":
      return new Cometh(row, column, modifier.toLowerCase() as ComethDirection);
    case "SOLOON":
      return new Soloon(row, column, modifier.toLowerCase() as SoloonColor);
    default:
      throw new Error("Unrecognized Astro");
  }
}

// Function to process an array of Astros, creating each with a delay to prevent hitting API rate limits
export async function processAstros(astros: Astro[]): Promise<void> {
  try {
    for (const astro of astros) {
      const result = await createAstralObject(astro);
      if (!result) throw new Error("Error processing Astral Object");
      await delay(700); // Wait for delayTime milliseconds before continuing to the next iteration to prevent 429 errors
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
