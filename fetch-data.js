// fetch-data.js - Node.js 18+ version



async function fetchCoinData(coins = ["bitcoin", "ethereum", "solana"]) {
  try {
    if (typeof fetch !== "function") {
      throw new Error(
        "global fetch is not available. Use Node.js 18+ (run `node -v`) or run this with an environment that provides fetch."
      );
    }

    const ids = coins.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`;

    console.log("Request URL:", url);

    const response = await fetch(url);

    console.log("Response status:", response.status, response.statusText);

    if (!response.ok) {
      // capture response body for debugging (text because it might not be JSON)
      const bodyText = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${bodyText}`);
    }

    const data = await response.json();
    console.log("Raw response JSON:", JSON.stringify(data, null, 2));

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
    // print full error for debugging
    console.error("Error fetching data:", err);
  }
}

fetchCoinData(["bitcoin", "ethereum", "solana"]);
