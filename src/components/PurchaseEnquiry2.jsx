import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";

const PurchaseEnquiry2 = () => {
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
      <PurchaseEnquiry2ToPrint ref={printRef} />
    </>
  );
};

export class PurchaseEnquiry2ToPrint extends Component {
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
            </div>
            <br />
            <br />
            <p className="text-start">
              Pease below is purchase Requisition / Demand No. _________ Dated
              _______ received from ________ regarding purchase of
              ________________________
            </p>
            <p className="text-start">
              In accordance with the instruction of PTV-HQs office Circular No.
              HSA/619/637 Dated 27.3.2014, member of local procurement cell are
              requested to kindly approve the case to proceed further
            </p>
            <br />
            <br />
            <p className="text-end text-decoration-underline fw-bold">
              Purchase Officer
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              Executive Manager (A&P)
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              Finance Manager
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              Executive Engineering Manager
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              General Manager
            </p>
          </div>
        </center>
      </div>
    );
  }
}

export default PurchaseEnquiry2;
