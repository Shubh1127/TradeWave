import React from "react";
import { useState } from "react";
function Hero() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="container-fluid bg-primary">
      <div className="row p-5">
        <div className="col-1"></div>
        <div className="col-5 text-white text-muted p-5">
          <h2 className="fs-3 mb-5 text-white">Support Portal</h2>
          <p className="fs-5 text-white">
            Search for an asnwer or browse help topics to create a ticket
          </p>
          <div
            className="bg-white p-3  d-flex justify-content-between rounded align-items-center mb-3"
            style={{ width: "35vw" }}
          >
            <input
              placeholder="Eg:how do i activate F&O ,why is my order getting rejected..."
              className="outline-0 border-0 "
              style={{
                outline: isFocused ? "none" : "",
                border: isFocused ? "none" : "",
                width:"30vw"
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            ></input>
            <i className=" text-black text-muted fa-solid fa-magnifying-glass"></i>
          </div>
          <span className="d-flex gap-3 mt-2">
            <a
              href=""
              className="text-white list-unstyled mb-3"
              style={{ textUnderlineOffset: "7px" }}
            >
              Track account opening
            </a>
            <a
              href=""
              className="text-white  list-unstyled"
              style={{ textUnderlineOffset: "7px" }}
            >
              {" "}
              Track segment activation
            </a>
            <a
              href=""
              className="text-white list-unstyled "
              style={{ textUnderlineOffset: "7px" }}
            >
              Intraday margins
            </a>
          </span>
          <a
            href=""
            className="text-white"
            style={{ textUnderlineOffset: "7px" }}
          >
            Kite user manual
          </a>
        </div>
        <div className="col-4 text-white mt-5  ">
            <h1 className="text-end fs-5"><a href="" className="text-white " style={{ textUnderlineOffset: "7px" }}>Track tickets</a></h1>
            <div className="row p-5 ">
            <h3 className="mt-3">Featured</h3>
            <ul className="list-unstyled py-3 " style={{width:"25rem"}}>
                <span className="d-flex">
                1.<li className="mb-3"><a href="" className="text-white " style={{ textUnderlineOffset: "7px" }}>Suspension of trading -  IDFC Limited</a></li>
                </span>
                <span className="d-flex">
                2.<li className="mb-3"><a href="" className="text-white " style={{ textUnderlineOffset: "7px" }}>Rights Entitlements listing in October 2024</a></li>
                </span>
                
            </ul>
            </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Hero;
