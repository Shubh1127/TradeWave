import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext"; 
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, stockPrice, stockName }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    // console.log("stock Name being sent",stockName)
    axios.post("http://localhost:3002/newOrder", {
      name: stockName, // Changed from uid to stockName for clarity
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
      userId: uid, // Include userId here
     
    });

    closeBuyWindow(); 
  };

  const handleCancelClick = () => {
    closeBuyWindow(); 
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <h2>Buying {stockName}</h2> {/* Displaying the stock name */}
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice} // Use passed stock price
              readOnly // Make price read-only as it is determined by the selected stock
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
