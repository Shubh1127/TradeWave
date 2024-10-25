import React, { useEffect, useState ,useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext"; 

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchOrders = async () => {
    if(user){
      const uid = user._id; 
    
      try {
        const response = await axios.get(`http://localhost:3002/allorders?userId=${uid}`);
        const fetchedOrders = response.data;

        // Apply filtering logic to remove orders where both BUY and SELL exist for the same stock
        const filteredOrders = removeMatchingBuyAndSellOrders(fetchedOrders);

        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    };
    fetchOrders();
  }, [userId]);

  // Function to remove stocks with both BUY and SELL orders
  const removeMatchingBuyAndSellOrders = (orders) => {
    const stockGroups = orders.reduce((acc, order) => {
      if (!acc[order.name]) {
        acc[order.name] = [];
      }
      acc[order.name].push(order);
      return acc;
    }, {});

    const filteredOrders = [];

    // Loop through each stock group and filter out matching BUY and SELL pairs
    Object.keys(stockGroups).forEach(stockName => {
      const stockOrders = stockGroups[stockName];
      const hasBuyOrder = stockOrders.some(order => order.mode === 'BUY');
      const hasSellOrder = stockOrders.some(order => order.mode === 'SELL');

      // Only add the stock if it doesn't have both BUY and SELL orders
      if (!(hasBuyOrder && hasSellOrder)) {
        filteredOrders.push(...stockOrders);
      }
    });

    return filteredOrders;
  };

  return (
    <div className="orders">
      {loading ? ( // Show loading state
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn btn-primary">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({orders.length})</h3>

          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Mode</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name} </td>
                    <td>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
