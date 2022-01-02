import moment from "moment";
import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";

const BillCovering = ({ leastCompany, leastPrice, quotation }) => {
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
      <BillCoveringToPrint
        ref={printRef}
        leastPrice={leastPrice}
        leastCompany={leastCompany}
        quotation={quotation}
      />
    </>
  );
};

export class BillCoveringToPrint extends Component {
  render() {
    const { leastPrice, leastCompany, quotation } = this.props;
    const date = new Date();
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
              <div className="col-md-6 text-end fw-bold">
                Dated {moment(date).format("DD/MM/YYYY")}
              </div>
              <br />
              <br />
              <br />
              <p className="text-start">
                Placed Below is bill no. ____________ Dated ____________
                amounting to Rs. {leastPrice} received from M/S{" "}
                {leastCompany.name}
                <br />
                This is in respect of supply of{" "}
                <span className="fw-bold">
                  {quotation.products[0] &&
                    quotation.products[0].product.name + " "}
                  {quotation.products[1] &&
                    "," + quotation.products[1].product.name + " "}{" "}
                </span>
                etc against our purchase order no ____________ Dated
                ______________
              </p>
              <p className="text-start">
                All the relevant documents duly by the concerned
                personnel/officer are attached as purchase procedure. It is
                certified that purchases have been made and received as per
                purchase manual
              </p>
              <p className="text-start">
                All the documents are attached here with and the bill is in
                accordance with purchase manual
              </p>
              <p className="text-start">
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
