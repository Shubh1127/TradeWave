import React from "react";
function Team() {
  return (
    <div className="container">
      <div className="row mt-2  p-2 mx-5 ">
        <h1 className="fs-2 text-center">People</h1>
      </div>
      <div className="row mt-5 px-5 mx-5   ">
        <div className="col  p-5  text-muted text-center" style={{ color: "rgb(66,66,66)" }}>
          <img
            src="media/images/nithinKamath.jpg"
            className="ms-5"
            style={{ borderRadius: "50%",width:"60%"}}
          />        
          <h5 className="mt-5 ms-5">Shubham Singh</h5>                    
          <h6 className="ms-5">CEO</h6>                    
        </div>
        <div className="col mt-4 p-5" style={{ color: "rgb(66,66,66)" }}>
          <p>
            Nithin bootstrapped and founded Tradwave in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Tradwave has changed the landscape of the Indian broking industry.
            <br></br>
            <br></br>
             He
            is a member of the SEBI Secondary Market Advisory Committee (SMAC)
            and the Market Data Advisory Committee (MDAC).
            <br></br>
            <br></br>
             Playing basketball is his zen.
             <br></br>
             <br></br>
             
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
