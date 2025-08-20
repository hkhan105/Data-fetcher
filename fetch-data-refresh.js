let btcChart; // keep chart instance
const refreshInterval = 60 * 1000; // 60 seconds (change this)

async function fetchBTCData() {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly";
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    const timestamps = data.prices.map(p => new Date(p[0]));
    const prices = data.prices.map(p => p[1]);

    // Format time as HH:MM
    const labels = timestamps.map(t =>
      t.getHours().toString().padStart(2, '0') + ":" +
      t.getMinutes().toString().padStart(2, '0')
    );

    const ctx = document.getElementById("btcChart").getContext("2d");

    if (btcChart) {
      // Update chart
      btcChart.data.labels = labels;
      btcChart.data.datasets[0].data = prices;
      btcChart.update();
    } else {
      // Create chart first time
      btcChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "BTC/USD",
            data: prices,
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.25
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { ticks: { maxTicksLimit: 12 }},
            y: { beginAtZero: false }
          }
        }
      });
    }
  } catch (err) {
    console.error("Error fetching BTC data:", err);
  }
}

// Run immediately
fetchBTCData();

// Refresh every X seconds
setInterval(fetchBTCData, refreshInterval);
