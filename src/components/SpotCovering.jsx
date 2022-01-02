import moment from "moment";
import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";

const SpotCovering = ({ quotation }) => {
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
      <SpotCoveringToPrint ref={printRef} quotation={quotation} />
    </>
  );
};

export class SpotCoveringToPrint extends Component {
  render() {
    const { quotation } = this.props;
    return (
      <div className="invert">
        <center>
          <h4>Pakistan Television Corporation Limited</h4>
          <h4>Peshawar Center</h4>
        </center>

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6 text-start fw-bold">Ref: PTV-P/1110/</div>
            <div className="col-md-6 text-end fw-bold">
              Dated {moment(new Date()).format("DD/MM/YYYY")}
            </div>
            <br />
            <br />
            <br />
            <p>
              We had floated a purchase enquiry number _________________________
              Dated {moment(quotation.createdAt).format("DD/MM/YYYY")} amongst
              various suppliers for{" "}
              <span className="fw-bold">
                {quotation.products[0] &&
                  quotation.products[0].product.name + " "}
                {quotation.products[1] &&
                  "," + quotation.products[1].product.name + " "}{" "}
              </span>
              etc
            </p>
            <p>
              In Response to our Purchase Enquiry we have received sealed
              quotations from the following suppliers
            </p>
            <ul
              className="text-start mt-3 fw-bold"
              style={{ listStyle: "none" }}
            >
              {quotation.companies.map((company, i) => (
                <li>
                  {i + 1}. M/s {company.name}
                </li>
              ))}
            </ul>
          </div>
          <p>
            Quotations are placed for opening these may please be opened /
            signed
          </p>
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-8 text-start">
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

            <div className="col-4 ">
              <p className="text-decoration-underline fw-bold">
                Purchase Officer
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotCovering;
