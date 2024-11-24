import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import watchlist from './watchlist.css'
import { DoughnutChart } from "./DoughnoutChart";
import { Tooltip, Grow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import GeneralContext from "./GeneralContext"; // Import your GeneralContext for using the buy/sell windows
import { useFormattedData } from "./useChart";
// WatchList Component
const WatchList = () => {
  const [stockData, setStockData] = useState([]);
  const doughnutChartData = useFormattedData(stockData);

  
  // Fetch stock data from backend API
  useEffect(() => {
    const fetchData = async () => {
      // Check if stockData is already populated to avoid re-fetching
      if (stockData.length === 0) {
        try {
          const response = await axios.get("http://localhost:3002/api/stocks");
          // console.log("API Data:", response.data);
          setStockData(response.data);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      }
    };
  
    fetchData();
  }, [stockData]) // Empty dependency array ensures this runs only once after the component mounts
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input type="text" name="search" id="search" placeholder="Search stocks" className="search" />
        <span className="counts">{stockData.length} / 50</span>
      </div>

      
      <ul className="list">
        {stockData.length > 0 ? (
          stockData.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))
        ) : (
          <p>Loading stocks...</p> 
        )}
      </ul>
      <div className="watchlist-container">
      
      
      {doughnutChartData ? (
        <DoughnutChart data={doughnutChartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
    </div>
  );
  
};

// WatchListItem Component to display individual stock details
const WatchListItem = ({ stock }) => {
  const [showButtons, setShowButtons] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    const latestDate = Object.keys(stock.data['Time Series (Daily)'])[0];
    const latestClosePrice = stock.data['Time Series (Daily)'][latestDate]['4. close']; 
    generalContext.openBuyWindow(stock.symbol, latestClosePrice, stock.symbol, latestClosePrice);
  };
  

  const handleSellClick = () => {
    const latestDate = Object.keys(stock.data['Time Series (Daily)'])[0];
    const latestClosePrice = stock.data['Time Series (Daily)'][latestDate]['4. close'];
    generalContext.openSellWindow(stock.symbol, latestClosePrice, stock.symbol, latestClosePrice);
  };

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className="green">{stock.symbol}</p>
        <div className="itemInfo">
          <span className="high">High: ${stock.data['Time Series (Daily)'][Object.keys(stock.data['Time Series (Daily)'])[0]]['2. high']}</span>
          <span className="low">Low: ${stock.data['Time Series (Daily)'][Object.keys(stock.data['Time Series (Daily)'])[0]]['3. low']}</span>
          <span className="c">Close: ${stock.data['Time Series (Daily)'][Object.keys(stock.data['Time Series (Daily)'])[0]]['4. close']}</span>
          <span className="vol">volume: {stock.data['Time Series (Daily)'][Object.keys(stock.data['Time Series (Daily)'])[0]]['5. volume']}</span>
        </div>
      </div>

      {showButtons && (
        <span className="actions">
          <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
            <button className="buy" onClick={handleBuyClick}>
              Buy
            </button>
          </Tooltip>
          <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
            <button className="sell" onClick={handleSellClick}>
              Sell
            </button>
          </Tooltip>
        </span>
      )}
    </li>
  );
  
};


export default WatchList;
