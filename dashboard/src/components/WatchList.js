import React, { useState, useEffect, useContext } from "react";
import watchlist from './watchlist.css';
import { DoughnutChart } from "./DoughnoutChart";
import { Tooltip, Grow } from "@mui/material";
// import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import GeneralContext from "./GeneralContext"; // Import your GeneralContext for using the buy/sell windows
import { useFormattedData } from "./useChart";
import Data from "../data/data";

const WatchList = () => {
  const [query, setQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState(Data);
  const [stockData, setStockData] = useState([]);
  const doughnutChartData = useFormattedData(stockData);

  // UseEffect to initialize stockData from Data
  useEffect(() => {
    setStockData(Data);
  }, []);

  

  // Handle search logic
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toUpperCase(); // Convert input to uppercase
    setQuery(searchTerm);
  
    const results = Data.filter((stock) => {
      const stockSymbol = stock.symbol.toUpperCase(); // Stock symbol in uppercase
      const companyName = (stock.data["Meta Data"]["2. Symbol"] || "").toUpperCase(); // Metadata or company name
  
      // Check if the searchTerm is included in either the stockSymbol or companyName
      return (
        stockSymbol.includes(searchTerm) ||
        companyName.includes(searchTerm)
      );
    });
  
    setFilteredStocks(results);
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks"
          className="search text-black"
          value={query}
          onChange={handleSearch}
        />
        <span className="counts">{filteredStocks.length} / 10</span>
      </div>

      <ul className="list">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))
        ) : (
          <p>Not Found</p>
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
    const latestClosePrice =
      stock.data['Time Series (Daily)'][latestDate]['4. close'];
    generalContext.openBuyWindow(
      stock.symbol,
      latestClosePrice,
      stock.symbol,
      latestClosePrice
    );
  };

  const handleSellClick = () => {
    const latestDate = Object.keys(stock.data['Time Series (Daily)'])[0];
    const latestClosePrice =
      stock.data['Time Series (Daily)'][latestDate]['4. close'];
    generalContext.openSellWindow(
      stock.symbol,
      latestClosePrice,
      stock.symbol,
      latestClosePrice
    );
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
          <span className="high">
            High: $
            {
              stock.data['Time Series (Daily)'][
                Object.keys(stock.data['Time Series (Daily)'])[0]
              ]['2. high']
            }
          </span>
          <span className="low">
            Low: $
            {
              stock.data['Time Series (Daily)'][
                Object.keys(stock.data['Time Series (Daily)'])[0]
              ]['3. low']
            }
          </span>
          <span className="c">
            Close: $
            {
              stock.data['Time Series (Daily)'][
                Object.keys(stock.data['Time Series (Daily)'])[0]
              ]['4. close']
            }
          </span>
          <span className="vol">
            Volume:{' '}
            {
              stock.data['Time Series (Daily)'][
                Object.keys(stock.data['Time Series (Daily)'])[0]
              ]['5. volume']
            }
          </span>
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
