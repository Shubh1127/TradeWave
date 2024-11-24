import React from "react";
import { positions } from "./useChart";

const Positions = () => {
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const profitOrLoss = curValue - stock.avg * stock.qty;
              const isProfit = profitOrLoss >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.price ? stock.price.toFixed(2) : "N/A"}</td>
                  <td className={profClass}>
                    {profitOrLoss.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
