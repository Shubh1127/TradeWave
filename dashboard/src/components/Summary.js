import React, { useState, useEffect, useContext } from "react";
import { UserContext } from './UserContext'; 
import GeneralContext from "./GeneralContext";
import { LineChart } from "./LineChart"; 
// import axios from "axios";
import Data from "../data/data"



const Summary = () => {
  const { user } = useContext(UserContext);
  const { message } = useContext(GeneralContext);
  
  const [stockData, setStockData] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);

  const username = user?.username || 'User';

  useEffect(()=>{
    setStockData(Data)
  })
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3002/api/stocks");
  //       setStockData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching stock data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); 

  useEffect(() => {
    if (stockData.length === 0) return;

    const formattedData = {
      labels: [], 
      datasets: [], 
    };

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    stockData.slice(0, 5).forEach((stock, index) => {
      const timeSeries = stock.data["Time Series (Daily)"];
      const dates = Object.keys(timeSeries).slice(0, 7).reverse(); 
      const closingPrices = dates.map((date) =>
        parseFloat(timeSeries[date]["4. close"])
      );

      if (index === 0) {
        formattedData.labels = dates;
      }

      formattedData.datasets.push({
        label: `${stock.symbol} - Closing Prices`,
        data: closingPrices,
        borderColor: colors[index],
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        tension: 0.2,
      });
    });

    setLineChartData(formattedData); 
  }, [stockData]);

  return (
    
      <div className="chart-container">
        {message && <p className="font-bold" style={{ color: 'red' }}>{message}</p>}

        <div className="username">
          <h6>Hi, {username}!</h6>
          <hr className="divider" />
        </div>

        <div>
          <h2>Stock Price Chart</h2>
          {lineChartData ? (
            <LineChart data={lineChartData} /> 
          ) : (
            <p>Loading chart...</p> 
          )}
        </div>
    </div>
  );
};

export default Summary;
