import React from "react";

function Footer() {
  return (
    <div className="container-fluid  border-top ">
      <div className="row   mt-5 " style={{marginLeft:"130px"}} >
        <div className="col ">
          <img
            src="media/images/logo.svg"
            style={{ width: "50%" }}
            className=" mb-2"
          />
          <p>© 2010 - 2024, Zerodha Broking Ltd. All rights reserved.</p>
        </div>
        <div className="col d-flex flex-column gap-1  ">
          <p>Company</p>
          <a href="" className="text-decoration-none">
            Products
          </a>
          <a href="" className="text-decoration-none">
            Pricing
          </a>
          <a href="" className="text-decoration-none">
            Referral programme
          </a>
          <a href="" className="text-decoration-none">
            Careers
          </a>
          <a href="" className="text-decoration-none">
            Zerodha.tech
          </a>
          <a href="" className="text-decoration-none">
            Press & media
          </a>
          <a href="" className="text-decoration-none">
            Zerodha Cares (CSR)
          </a>
        </div>
        <div className="col d-flex flex-column gap-1">
          <p>Support</p>
          <a href="" className="text-decoration-none">
            Contact us
          </a>
          <a href="" className="text-decoration-none">
            Support portal
          </a>
          <a href="" className="text-decoration-none">
            Z-connect blog
          </a>
          <a href="" className="text-decoration-none">
            List of charges
          </a>
          <a href="" className="text-decoration-none">
            Downloads & resources
          </a>
          <a href="" className="text-decoration-none">
            Videos
          </a>
          <a href="" className="text-decoration-none">
            Market overiew
          </a>
          <a href="" className="text-decoration-none">
            How to file a complaint?
          </a>
          <a href="" className="text-decoration-none">
            Status of your complaints
          </a>
        </div>
        <div className="col">
          <p>Account</p>
          <a href="" className="text-decoration-none">
            Open an account
          </a>
          <br></br>
          <a href="" className="text-decoration-none">
            Fund transfer
          </a>
        </div>
        <div className="col"></div>
      </div>
      <div className="container mt-5 text-muted fs-6 p-5" >
      <p>
        Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
        no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking
        Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through
        Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration
        no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154,
        4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th
        Phase, Bengaluru - 560078, Karnataka, India. For any complaints
        pertaining to securities broking please write to <span className="text-primary">complaints@zerodha.com</span>,
        for DP related to <span className="text-primary">dp@zerodha.com</span>. Please ensure you carefully read the
        Risk Disclosure Document as prescribed by SEBI | ICF{" "}
      </p>

      <p>
        Procedure to file a complaint on <span className="text-primary">SEBI SCORES</span>: Register on SCORES portal.
        Mandatory details for filing complaints on SCORES: Name, PAN, Address,
        Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy
        redressal of the grievances
      </p>

      <p className="text-primary"> Smart Online Dispute Resolution | Grievances Redressal Mechanism </p>
      <p>
        Investments in securities market are subject to market risks; read all
        the related documents carefully before investing.
      </p>
      <p>
        Attention investors: 1) Stock brokers can accept securities as margins
        from clients only by way of pledge in the depository system w.e.f
        September 01, 2020. 2) Update your e-mail and phone number with your
        stock broker / depository participant and receive OTP directly from
        depository on your e-mail and/or mobile number to create pledge. 3)
        Check your securities / MF / bonds in the consolidated account statement
        issued by NSDL/CDSL every month.
      </p>

      <p>

        "Prevent unauthorised transactions in your account. Update your mobile
        numbers/email IDs with your stock brokers. Receive information of your
        transactions directly from Exchange on your mobile/email at the end of
        the day. Issued in the interest of investors. KYC is one time exercise
        while dealing in securities markets - once KYC is done through a SEBI
        registered intermediary (broker, DP, Mutual Fund etc.), you need not
        undergo the same process again when you approach another intermediary."
        Dear Investor, if you are subscribing to an IPO, there is no need to
        issue a cheque. Please write the Bank account number and sign the IPO
        application form to authorize your bank to make payment in case of
        allotment. In case of non allotment the funds will remain in your bank
        account. As a business we don't give stock tips, and have not authorized
        anyone to trade on behalf of others. If you find anyone claiming to be
        part of Zerodha and offering such services, please <span className="text-primary">create a ticket here</span>.
      </p>
      </div>
    </div>
  );
}

export default Footer;
