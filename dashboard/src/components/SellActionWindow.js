import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext"; 
import { UserContext } from "./UserContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, stockPrice, stockName }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [userBuyOrders, setUserBuyOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { closeSellWindow } = useContext(GeneralContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch user's buy orders when component mounts
    const fetchBuyOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/sellstock`, {
          params: { userId: user._id }, // Include user ID in the request
        });
        setUserBuyOrders(response.data);
      } catch (error) {
        console.error("Error fetching buy orders:", error);
      }
    };

    fetchBuyOrders();
  }, [user]);

  const handleSellClick = async () => {
    try {
      const response = await axios.post("http://localhost:3002/sellstock", {
        name: stockName,
        qty: stockQuantity,
        price: stockPrice,
        userId: user._id,
      });
  
      closeSellWindow(); // Close window on success
    } catch (err) {
      if (err.response && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        console.error("Error selling stock:", err);
      }
    }
  };
  const handleCancelClick = () => {
    closeSellWindow(); 
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <h2>Selling {stockName}</h2> 
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
              value={stockPrice} 
              readOnly 
            />
          </fieldset>
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
