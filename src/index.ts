import dotenv from "dotenv";
import { AstralObjectMap } from "./types/goal";
import { parseAstro, processAstros } from "./services/astroService";
import { Astro } from "./types/astros";

// Load environment variables from .env file
dotenv.config();

const { API_URL, CANDIDATE_ID } = process.env;

// Fetches goal data from the Megaverse API
async function fetchGoalData(): Promise<AstralObjectMap | undefined> {
  const goalURL = `${API_URL}/map/${CANDIDATE_ID}/goal`;
  try {
    const response = await fetch(goalURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return undefined;
}

// Processes the fetched goal data to identify and handle Astro objects
async function processData(map: AstralObjectMap) {
  const astros: Astro[] = [];

  // Iterate over each row and column of the map
  map.goal.forEach((row, rowIndex) => {
    row.forEach((item, columnIndex) => {
      if (item !== "SPACE") {
        // Check if the current item is not "SPACE"
        astros.push(parseAstro(item, rowIndex, columnIndex)); // Parse and add the Astro object to the array
      }
    });
  });

  // Process all Astro objects and handle completion or errors
  processAstros(astros)
    .then(() => console.log("-----Finished processing all Astros-----"))
    .catch((error) => console.error("An error occurred:", error));
}

// Main function
async function main() {
  const data = await fetchGoalData();

  if (data) {
    await processData(data);
  }
}

// Execute the main function
main();
