import React from "react";

function Stats() {
  return (
    <div className=" container ">
      <div className="mt-5 row  mx-4  lh-5 mb-5  p-4">
        <div className="col-5 ">
          <h1 className=" mb-5 ">Trust with confidence</h1>
          <h3>Customer-first always</h3>  
          <p className=" text-muted">That's why 1.3+ crore customers trust Tradwave with ₹3.5+ lakh crores worth of equity investments. </p>
          <h3>No spam or gimmicks</h3>  
          <p  className="text-muted">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
          <h3>The Tradwave Universe</h3>  
          <p  className="text-muted">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
          <h3>Do better with money</h3>
          <p className="text-muted"> With initiatives like Nudge and Kill Switch, we don't just facilitate transcations, but actively help you do better with your money. </p>
        </div>
        {/* <div className="col-1"></div> */}
        <div className="col-6 ms-5 ">
          <img src="media/images/ecosystem.png" style={{ width: "90%" }} />
          <div className=" text-center">
            <a href="" className="me-5">Explore our products <i class="fa-solid fa-arrow-right"></i>  </a>
            <a href="">Try Kite demo <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
