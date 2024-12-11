import React from "react";

const ContactUs = () => {
  return (
    <div className=" container">
      <div className="  " style={{ height: "30vh" }}>
        <div
          className="pt-2 fs-2 fw-bolder   d d-flex justify-content-center align-items-center"
          style={{ height: "30vh" }}
        >
          Contact Us
        </div>
      </div>
        <hr></hr>
        <div className="d d-flex ">
          <div className="container d d-flex">
            <div className="col-3 ">
              <p>Support portal</p>
              <p>
                Send us email <i class="fa-regular fa-hand-point-down"></i>
              </p>
              <a href="mailto:example@example.com?subject=Inquiry&body=Hello">
                Shubhamsinghmor2312@gmail.com
              </a>
            </div>
            <div className="col-3 ">
              New account opening
              <p>Monday-Friday</p>
              <p>8:30 AM - 5:00 PM</p>
              <p>Saturday</p>
              <p>9:00 AM - 2:00 PM</p>
            </div>
            <div className="col-3 ">
              Support
              <p>Monday-Friday</p>
              <p>8:30 AM - 5:00 PM</p>
            </div>
            <div className="col-3 ">
              Call & trade
              <p>Monday-Friday</p>
              <p>9:00 AM - 11:30 PM</p>
            </div>
          </div>
        </div>

        <hr></hr>
        <div className="container" style={{ height: "100vh" }}>
            <div className=" d d-flex p-5">
          <div className="col-2"></div>
          <div className="col-3">
            <p>We are based in Bengaluru</p>
          </div>
          <div className="col-3">
            <p>     <div className="ms-5 ps-5 mb-4">HQ</div>
                Tradewave, #153/154,
                4th Cross, J.P Nagar 4th Phase,
                Opp. Clarence Public School,
                Bengaluru - 560078</p>
          </div>
            </div>
            <hr></hr>
            <div className="container d d-flex">
                <div className="col-2"></div>
                <div className="col-4  pt-5 "><p className="mt-5 fs-2">
                75+ branches and partner offices
                    </p>
                    </div>
                <div className="col-3">
                    <img className="mt-5" src="https://zerodha.com/static/images/contact-map.png" style={{height:"50vh"}}></img>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default ContactUs;
