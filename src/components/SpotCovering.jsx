import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";

const SpotCovering = () => {
  const printRef = useRef();
  const pageStyle = `@page { size: portrait }`;
  return (
    <>
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary mt-4">Print this out!</button>
          )}
          content={() => printRef.current}
          pageStyle={pageStyle}
        />
      </center>
      <SpotCoveringToPrint ref={printRef} />
    </>
  );
};

export class SpotCoveringToPrint extends Component {
  render() {
    return (
      <div className="invert">
        <center>
          <h4>Pakistan Television Corporation Limited</h4>
          <h4>Peshawar Center</h4>
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-6 text-start fw-bold">
                Ref: PTV-P/1110/
              </div>
              <div className="col-md-6 text-end fw-bold">Dated _________</div>
              <br />
              <br />
              <br />
              <p>
                We had floated a purchase enquiry number
                _________________________ Dated _______ amongst various
                suppliers for _________________________
              </p>
              <p>
                In Response to our Purchase Enquiry we have received sealed
                quotations from the following suppliers
              </p>
              <ul className="text-start" style={{ listStyle: "decimal" }}>
                <li>M/s _________________________</li>
                <li>M/s _________________________</li>
                <li>M/s _________________________</li>
                <li>M/s _________________________</li>
                <li>M/s _________________________</li>
              </ul>
              <p>
                Quotations are placed for opening these may please be opened /
                signed
              </p>
            </div>
            <p className="text-end text-decoration-underline fw-bold">
              Purchase Officer
            </p>
            <p className="text-start text-decoration-underline fw-bold">
              Executive Manager (A&P)
            </p>
            <p className="text-start text-decoration-underline fw-bold">
              Finance Manager
            </p>
            <p className="text-start text-decoration-underline fw-bold">
              Executive Engineering Manager
            </p>
            <p className="text-start text-decoration-underline fw-bold">
              General Manager
            </p>
            <br />
            <br />
          </div>
        </center>
      </div>
    );
  }
}

export default SpotCovering;
