const fetch = require('node-fetch');

const API_URL = "https://challenge.crossmint.io/api/";
const candidateId = "1fa26b6a-4f79-48cb-bcde-788a3e29a112";


const goalURL = `${API_URL}map/${candidateId}/goal`;



// Function to fetch data from the provided URL
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function processData(data) {
    data.goal.forEach((row, rowIndex) => {
        row.forEach(async (item, columnIndex) => {
            if (item !== 'SPACE') {
                await callMegaverseAPI({ astro, row: rowIndex, column: columnIndex });
            }
        });
    });
}


async function callMegaverseAPI(item) {
    try {
        const megaverseEndpoint = getItemEndpoint(item.astro);
        const response = await fetch(megaverseEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item }),
        });
        const responseData = await response.json();
        console.log('Action endpoint called successfully:', responseData);
    } catch (error) {
        console.error('Error calling action endpoint:', error);
    }
}

async function main() {
    const data = await fetchData(goalURL);
    if (data) {
        await processData(data);
    }
}

function getData(item) {
    const endpoint = API_URL;
    let astro, modifier = null;
    let astroItem = {}
    if (item.contains("_")) {
        [modifier, astro] = item.split("_")

    }
    astroItem = {
        endpoint: `${API_URL}/${astro}`,
        body: {

        }
    }
}

main();
