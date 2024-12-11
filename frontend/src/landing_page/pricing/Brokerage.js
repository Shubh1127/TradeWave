import React from "react";
function Brokerage() {
  return (
    <div className="container">
      <div className="row  text-center border-top  p-5 ">
        <div className="col-6 p-5 ">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </a>
          <ul className="text-start text-muted">
            <li>
              {" "}
              Call and RMS auto-squareoff: Additional charges of ? 50 + GST per
              order.{" "}
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged ?
              20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS),0.5% or ? 100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or 2200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged 240 per executed order instead of 220 per executed order.
            </li>
          </ul>
        </div>

        <div className="col-6 p-5 ">
            <h3 className="fs-5">List of charges</h3>
            <p className="text-muted">
              GST<br/> Tax levied by the government on the services rendered. 18% of
              ( brokerage + SEBI charges + transaction charges)<br/> SEBI Charges<br/>
              Charged at ₹10 per crore + GST by Securities and Exchange Board of
              India for regulating the markets.<br/> DP (Depository participant)<br/><br/>
              charges ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Tradewave fee + ₹2.34
              GST) is charged on the trading account ledger when stocks are
              sold, irrespective of quantity.<br/><br/> Female demat account holders (as
              first holder) will enjoy a discount of ₹0.25 per transaction on
              the CDSL fee. <br/><br/>Debit transactions of mutual funds & bonds get an
              additional discount of ₹0.25 on the CDSL fee.
            </p>
          
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
