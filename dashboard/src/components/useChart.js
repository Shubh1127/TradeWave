import { useState, useEffect } from "react";

// Hook to handle doughnut chart data
const useFormattedData = (stockData) => {
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (!stockData) return;

    const chartData = {
      labels: [], // Company symbols
      datasets: [],
    };

    const colors = [
      "rgba(75,192,192,0.8)", // IBM color
      "rgba(255,99,132,0.8)", // AAPL color
      "rgba(54,162,235,0.8)", // TSLA color
      "rgba(153,102,255,0.8)", // MSFT color
      "rgba(255,159,64,0.8)", // GOOG color
    ];

    stockData.slice(0, 5).forEach((stock, index) => {
      const timeSeries = stock.data["Time Series (Daily)"];
      const highPrices = [];
      const lowPrices = [];

      // Get high and low prices for the last 7 days
      const dates = Object.keys(timeSeries).slice(0, 7);
      dates.forEach((date) => {
        highPrices.push(parseFloat(timeSeries[date]["2. high"]));
        lowPrices.push(parseFloat(timeSeries[date]["3. low"]));
      });

      // Add company symbol as label
      chartData.labels.push(stock.symbol);

      // High prices dataset
      chartData.datasets.push({
        label: `${stock.symbol} - High Prices`,
        data: highPrices.reverse(), // Chronological order
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1,
        fill: true,
      });

      // Low prices dataset
      chartData.datasets.push({
        label: `${stock.symbol} - Low Prices`,
        data: lowPrices.reverse(),
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1,
        fill: true,
      });
    });

    setFormattedData(chartData); // Store the formatted data
  }, [stockData]);

  return formattedData;
};

// Hook to handle line chart data



// Assuming the `positions` data is being imported or defined somewhere in the file.
const positions = [
  { symbol: "IBM", position: 1 },
  { symbol: "AAPL", position: 2 },
  { symbol: "TSLA", position: 3 },
  { symbol: "MSFT", position: 4 },
  { symbol: "GOOG", position: 5 },
];

// Export everything from this file
export {
  useFormattedData, // Doughnut chart data hook
  positions, // Position data
};
