import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { UserContext } from "./UserContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { user } = useContext(UserContext); // Access the user context

  useEffect(() => {
    if (user) {
      const uid = user._id; // Get the user ID from context

      // Fetch the holdings using the user ID
      axios
        .get(`http://localhost:3002/holdings?userId=${uid}`)
        .then((res) => {
          console.log(res.data);
          setAllHoldings(res.data);
        })
        .catch((error) => {
          console.error("Error fetching holdings:", error);
        });
    }
  }, [user]); // Ensure that the useEffect runs again when `user` changes

  // Map over holdings to generate chart labels and data
  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.ltp || 0), // Fallback to 0 if ltp is undefined
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Calculate total investment, current value, and P&L
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (stock.avgCost || 0) * (stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + (stock.currentValue || 0),
    0
  );
  const pnl = currentValue - totalInvestment;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const {
                name,
                qty,
                avgCost,
                ltp,
                currentValue,
                pnl,
                netChange,
                dayChange,
              } = stock;

              // Ensure all properties are defined before calling toFixed()
              const formattedAvgCost = (avgCost || 0).toFixed(2);
              const formattedLtp = (ltp || 0).toFixed(2);
              const formattedCurrentValue = (currentValue || 0).toFixed(2);
              const formattedPnl = (pnl || 0).toFixed(2);
              const formattedNetChange = (netChange || 0).toFixed(2);
              const formattedDayChange = (dayChange || 0).toFixed(2);

              // Determine profit/loss class
              const isProfit =
                formattedCurrentValue - formattedAvgCost * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = formattedDayChange >= 0 ? "profit" : "loss";

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{qty}</td>
                  <td>{formattedAvgCost}</td>
                  <td>{formattedLtp}</td>
                  <td>{formattedCurrentValue}</td>
                  <td className={profClass}>{formattedPnl}</td>
                  <td className={profClass}>{formattedNetChange}</td>
                  <td className={dayClass}>{formattedDayChange}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {pnl.toFixed(2)} ({((pnl / totalInvestment) * 100).toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
