import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";

const BillCovering = () => {
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
      <BillCoveringToPrint ref={printRef} />
    </>
  );
};

export class BillCoveringToPrint extends Component {
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
                Placed Below is bill no. ____________ Dated ____________
                amounting to Rs. _______ received from M/S _________
                <br />
                This is in respect of supply of _________________________
                against our purchase order no ____________ Dated ______________
              </p>
              <p>
                All the relevant documents duly by the concerned
                personnel/officer are attached as purchase procedure. It is
                certified that purchases have been made and received as per
                purchase manual
              </p>
              <p>
                All the documents are attached here with and the bill is in
                accordance with purchase manual
              </p>
              <p>
                General manager may kindly accord financial approval so that
                amount may be payed to the supplier concerned
              </p>
            </div>
            <p className="text-end text-decoration-underline fw-bold">
              Executive Manager (A&P)
            </p>
            <p className="text-start text-decoration-underline fw-bold">
              Encis ()
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              General Manager
            </p>
            <br />
            <p className="text-start text-decoration-underline fw-bold">
              Finance Manager
            </p>
          </div>
        </center>
      </div>
    );
  }
}

export default BillCovering;
