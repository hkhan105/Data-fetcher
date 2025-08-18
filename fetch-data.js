// fetch-data.js - Node.js 18+ version

const API_KEY = "CG-oBqnBxu62dV1UAonL7JtsKhV";

// Node.js 18+ has fetch built-in; if older, install node-fetch
// npm install node-fetch
// import fetch from 'node-fetch';

async function fetchCoinData(coins = ["bitcoin", "ethereum", "solana"]) {
  try {
    const ids = coins.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    for (const coin of coins) {
      if (data[coin]) {
        const c = data[coin];
        console.log(`\n=== ${coin.toUpperCase()} ===`);
        console.log(`Price (USD): $${c.usd}`);
        console.log(`Market Cap: $${c.usd_market_cap}`);
        console.log(`24h Volume: $${c.usd_24h_vol}`);
      } else {
        console.log(`\nNo data for ${coin}`);
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
}

fetchCoinData(["bitcoin", "ethereum", "solana"]);
