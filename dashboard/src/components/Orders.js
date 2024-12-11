import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import moment from "moment";  // Import moment.js to format dates and time

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const uid = user._id; 
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3002/allorders?userId=${uid}`);
          const fetchedOrders = response.data;
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };
    fetchOrders();
  }, [userId]);

  // Group orders by date
  const groupOrdersByDate = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      const orderDate = moment(order.createdAt).format("YYYY-MM-DD"); // Format the date to group by
      if (!acc[orderDate]) {
        acc[orderDate] = [];
      }
      acc[orderDate].push(order);
      return acc;
    }, {});
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="orders">
      {loading ? ( // Show loading state
        <p>Loading orders...</p>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn btn-primary">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Order History</h3>

          {Object.keys(groupedOrders).map((date, index) => (
            <div key={index} className="order-date-group">
              <h4>{date}</h4> {/* Display the date */}
              
              <div className="order-table">
                <table>
                  <thead>
                    <tr>
                      <th>Stock</th>
                      <th>Mode</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Time</th> {/* New column for time */}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[date].map((order, idx) => {
                      const orderDate = moment(order.createdAt).format("YYYY-MM-DD"); // Date
                      const orderTime = moment(order.createdAt).format("HH:mm:ss"); // Time
                      return (
                        <tr key={idx}>
                          <td>{order.name}</td>
                          <td>{order.mode}</td>
                          <td>{order.qty}</td>
                          <td>${order.price}</td>
                          <td>{orderTime}</td> 
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
