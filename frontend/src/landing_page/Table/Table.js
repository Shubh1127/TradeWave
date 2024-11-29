import React, { useState } from "react";

function Table() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "equity" ? "active" : ""}`}
            onClick={() => setActiveTab("equity")}
          >
            Equity
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "currency" ? "active" : ""}`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "commodity" ? "active" : ""}`}
            onClick={() => setActiveTab("commodity")}
          >
            Commodity
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === "equity" && (
          <div className="tab-pane fade show active">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-muted">Equity Delivery</th>
                  <th className="text-muted">Equity Intraday</th>
                  <th className="text-muted">F&O - Futures</th>
                  <th className="text-muted">F&O - Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted">Brokerage</td>
                  <td className="text-muted">Zero Brokerage</td>
                  <td className="text-muted">0.03% or Rs. 20/executed order whichever is lower</td>
                  <td className="text-muted">0.03% or Rs. 20/executed order whichever is lower</td>
                  <td className="text-muted">Flat Rs. 20 per executed order</td>
                </tr>
                <tr>
                  <td className="text-muted">STT/CTT</td>
                  <td className="text-muted">0.1% on buy & sell</td>
                  <td className="text-muted">0.025% on the sell side</td>
                  <td className="text-muted">0.02% on the sell side</td>
                  <td className="text-muted">0.125% of the intrinsic value on options that are bought </td>
                </tr>
                <tr>
                  <td className="text-muted">Transaction charges</td>
                  <td className="text-muted">NSE: 0.00297%
                  BSE: 0.00375%</td>
                  <td className="text-muted">NSE: 0.00297%
                  BSE: 0.00375%</td>
                  <td className="text-muted">NSE: 0.00173%
                  BSE: 0</td>
                  <td className="text-muted">NSE: 0.03503% (on premium)
                  BSE: 0.0325% (on premium)</td>
                </tr>
                <tr>
                  <td className="text-muted">GST</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>
                <tr>
                  <td className="text-muted">SEBI charges</td>
                  <td className="text-muted">₹10 / crore</td>
                  <td className="text-muted">₹10 / crore</td>
                  <td className="text-muted">₹10 / crore</td>
                  <td className="text-muted">₹10 / crore </td>
                </tr>
                <tr>
                  <td className="text-muted">Stamp charges</td>
                  <td className="text-muted">0.015% or ₹1500 / crore on buy side</td>
                  <td className="text-muted">0.003% or ₹300 / crore on buy side</td>
                  <td className="text-muted">0.002% or ₹200 / crore on buy side</td>
                  <td className="text-muted">0.003% or ₹300 / crore on buy side
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "currency" && (
          <div className="tab-pane fade show active">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-muted" >Currency futures</th>
                  <th className="text-muted" >Currency options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted">Brokerage</td>
                  <td className="text-muted">0.03% or ₹ 20/executed order whichever is lower</td>
                  <td className="text-muted">	₹ 20/executed order</td>
                </tr>
                <tr>
                  <td className="text-muted">STT/CTT</td>
                  <td className="text-muted">No STT</td>
                  <td className="text-muted">No STT</td>
                </tr>
                <tr>
                  <td className="text-muted">Transaction charges</td>
                  <td className="text-muted">NSE: 0.00035%
                  BSE: 0.00045%</td>
                  <td className="text-muted">NSE: 0.0311%
                  BSE: 0.001%</td>
                </tr>
                <tr>
                  <td className="text-muted">GST</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>
                <tr>
                  <td className="text-muted">SEBI charges	</td>
                  <td className="text-muted">₹10 / crore</td>
                  <td className="text-muted">₹10 / crore</td>
                </tr>
                <tr>
                  <td className="text-muted">Stamp charges	</td>
                  <td className="text-muted">	0.0001% or ₹10 / crore on buy side</td>
                  <td className="text-muted">0.0001% or ₹10 / crore on buy side</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "commodity" && (
          <div className="tab-pane fade show active">
            <table className="table table-bordered text-center ">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-muted">Commodity futures</th>
                  <th className="text-muted">Commodity options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted">Brokerage</td>
                  <td className="text-muted">0.03% or Rs. 20/executed order whichever is lower</td>
                  <td className="text-muted">₹ 20/executed order</td> 
                </tr>
                <tr>
                  <td className="text-muted">STT/CTT	</td>
                  <td className="text-muted">0.01% on sell side (Non-Agri)</td>
                  <td className="text-muted">0.05% on sell side</td>
                </tr>
                <tr>
                  <td className="text-muted">Transaction charges	</td>
                  <td className="text-muted">MCX: 0.0021%
                  NSE: 0.0001%</td>
                  <td className="text-muted">MCX: 0.0418%
                  NSE: 0.001%</td>
                </tr>
                <tr>
                  <td className="text-muted">GST</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                  <td className="text-muted">18% on (brokerage + SEBI charges + transaction charges)</td>
                </tr>
                <tr>
                  <td className="text-muted">SEBI charges	</td>
                  <td className="text-muted">Agri:
                    ₹1 / crore
                    Non-agri:
                    ₹10 / crore</td>
                  <td className="text-muted">₹10 / crore</td>
                </tr>
                <tr>
                  <td className="text-muted">Stamp charges	</td>
                  <td className="text-muted">0.002% or ₹200 / crore on buy side</td>
                  <td className="text-muted">0.003% or ₹300 / crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
