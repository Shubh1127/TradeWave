import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useNavigate } from 'react-router-dom';
function Universe() {
  const navigate = useNavigate(); 
    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the signup page when the button is clicked
    };
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <p>
          Want to know more about our technology stack? Check out the{" "}
          <span className=" text-primary">Zerodha.tech </span>blog.
        </p>
        <h2 className="mt-5">The Zerodha Universe</h2>
        <p className=" fs-6 mt-3">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className=" d-flex flex-column ps-5">
        <div className="d-flex  ms-5  gap-5 p-5 " style={{width:"80%"}}>
            <div className="col"></div>
          <div className="col-4  ms-3  p-3 ">
            <img src="media/images/zerodhaFundHouse.png"  style={{width:"70%"}} className="mb-2"/>
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Our asset management venture that is simple and transparent index funds to help you save for your goals.
            </p>
          </div>
          <div className="col-4  mt-2  p-3">
            <img src="media/images/sensibullLogo.svg" style={{ width: "80%" }} className="mb-2" />
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
            </p>
          </div>
          <div className="col-4 p-3">
            <img src="https://zerodha.com/static/images/partners/tijori.svg" style={{ width: "50%" }} />
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
            </p>
          </div>
        </div>
        <div className="d-flex ms-5 m-auto gap-5 p-5" style={{width:"80%"}}>
            <div className="col"></div>
            <div className="col-4 p-3">
            <img src="media/images/streakLogo.png" style={{ width: "70%" }} />
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs
            </p>
          </div>
          <div className="col-4 mt-2 p-3">
            <img src="media/images/smallcaseLogo.png" />
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs
            </p>
          </div>
          <div className="col-4 mt-2 p-3">
            <img src="media/images/dittoLogo.png" style={{ width: "47%" }} className="mb-1"/>
            <p className=" text-muted" style={{fontSize:"12px"}}>
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs
            </p>
          </div>
          
        </div>
        
        
        </div>
        <div className="mb-5">
        <button className="p-2 btn btn-primary fs-5 mt-3" onClick={handleSignupClick} style={{ width: "15%", margin: "0 auto" }}> Signup now</button>
        </div>
      </div>
    </div>
  );
}

export default Universe;
