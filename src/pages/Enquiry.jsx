import moment from "moment";
import React, { Component, Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PurchaseEnquiry2ToPrint from "../components/PurchaseEnquiry2";
import SpotCovering from "../components/SpotCovering";
import { getQuotation } from "../services/quotationService";

const Enquiry = () => {
  const [quotation, setQuotation] = useState({
    products: [],
    companies: [],
    bids: [],
    lastDate: "",
    qtype: "",
  });
  const [companies, setCompanies] = useState([]);
  const { qid, cid } = useParams();
  const printRef = useRef();
  const getSingleQuotation = async () => {
    const { data: quotation } = await getQuotation(qid);
    setQuotation(quotation);
    //  setQuotation(quotation);
  };
  useEffect(() => {
    cid && getSingleQuotation();
  }, [cid]);
  useEffect(() => {
    let companies = [];

    const fc = quotation.companies.find((c) => c._id === cid);
    if (fc !== undefined) {
      companies = [fc];
    } else {
      companies = quotation.companies;
    }
    setCompanies(companies);
  }, [quotation]);
  const pageStyle = `@page { size: portrait }`;

  return (
    <>
      <PurchaseEnquiry2ToPrint quotation={quotation} />
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary mt-4">Print this out!</button>
          )}
          content={() => printRef.current}
          pageStyle={pageStyle}
        />
      </center>
      <EnquiryToPrint
        quotation={quotation}
        companies={companies}
        date={new Date()}
        ref={printRef}
      />
      <SpotCovering quotation={quotation} />
    </>
  );
};

class EnquiryToPrint extends Component {
  render() {
    const { quotation, companies, date } = this.props;
    return (
      <center className="invert">
        <div className="container entable text-start">
          <center>
            <h4>Pakistan Television Corporation Limited</h4>
            <h4>Peshawar Center</h4>
          </center>
          <div className="mt-5">
            <div className="row">
              <div className="col-8">
                <table className="mt-3">
                  <tbody>
                    {companies &&
                      companies.map((company) => (
                        <Fragment key={company._id}>
                          <tr className="fw-bold text-decoration-underline">
                            <td>
                              <Link
                                to={`/quotation/enquiry/${quotation._id}/${company._id}`}
                                style={{ color: "black" }}
                              >
                                {company.name}
                              </Link>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="col-4">
                <table className="mt-3">
                  <tbody>
                    <tr>
                      <td>TEL: 091-9211889-98</td>
                    </tr>
                    <tr>
                      <td
                        className="fw-bold text-decoration-underline"
                        style={{ fontSize: "14px" }}
                      >
                        Ref: {quotation && quotation.refNo}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Date: {moment(quotation.createdAt).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <div className="mt-5"> */}

          <center>
            <table className="table table-bordered mt-5">
              <thead>
                <th>S.no</th>
                <th>Description</th>
                <th>unit</th>
                <th>qty</th>
              </thead>
              <tbody>
                {quotation.products.map((product, i) => {
                  return (
                    <tr key={product._id}>
                      <th>{i + 1}</th>
                      <td>{product.product.name}</td>
                      <td>{product.product.unit}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
          {/* </div> */}
          <p style={{ fontSize: 12 }} className="text-start">
            Please indicate your earliest delivery date. Your Sealed/Registered
            Quotation must reach the office of the <br /> General Manager PTV
            Peshawar by 12 noon before,{" "}
            {moment(quotation.lastDate).format("DD/MM/YYYY")} And put the
            original tender in one envelope which <br /> will be sealed and
            placed inside another cover. Outside cover shall also be sealed.{" "}
            <br /> Please write the word “QUOTATION” on the top of envelope and
            our Ref. # as well and also your address <br /> Payment will be made
            100% on receipt of goods by the consignee in good condition after
            inspection <br /> Please note that the corporation reserve the right
            to reject all the quotation without showing any cause <br /> Please
            quote your GST and National Tax Number <br /> Final Payment will be
            made after providing Annexure C.
          </p>
          <p style={{ pageBreakAfter: "always" }}></p>
        </div>

        {/* ********************************* */}
        <div className="container">
          {companies.length === 1 ||
            companies.map((company) => (
              <div className="container entable text-start">
                <center>
                  <h4>Pakistan Television Corporation Limited</h4>
                  <h4>Peshawar Center</h4>
                </center>
                <div className="mt-5">
                  <div className="row">
                    <div className="col-8">
                      <table className="mt-3">
                        <tbody>
                          <tr className="fw-bold text-decoration-underline ">
                            <td>
                              <Link
                                to={`/quotation/enquiry/${quotation._id}/${company._id}`}
                                style={{ color: "black" }}
                              >
                                {company.name}
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-4">
                      <table className="mt-3">
                        <tbody>
                          <tr>
                            <td>TEL: 091-9211889-98</td>
                          </tr>
                          <tr>
                            <td
                              className="fw-bold text-decoration-underline"
                              style={{ fontSize: "14px" }}
                            >
                              Ref: {quotation && quotation.refNo}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Date: {date.getDate()}/{date.getMonth() + 1}/
                              {date.getFullYear()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-5"> */}
                <p className="fs-4 text-bold text-center">PURCHASE ENQUIRY</p>
                <p>
                  Dear Sir, <br /> we shall oblige if you will let us have your
                  lowest quotation of the following goods{" "}
                </p>
                <center>
                  <table className="table table-bordered mt-5">
                    <thead>
                      <th>S.no</th>
                      <th>Description</th>
                      <th>unit</th>
                      <th>qty</th>
                    </thead>
                    <tbody>
                      {quotation.products.map((product, i) => {
                        return (
                          <tr key={product._id}>
                            <th>{i + 1}</th>
                            <td>{product.product.name}</td>
                            <td>{product.product.unit}</td>
                            <td>{product.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </center>
                {/* </div> */}
                <p style={{ fontSize: 12 }} className="text-start">
                  Please indicate your earliest delivery date. Your
                  Sealed/Registered Quotation must reach the office of the{" "}
                  <br /> General Manager PTV Peshawar by 12 noon before,{" "}
                  {moment(quotation.lastDate).format("DD/MM/YYYY")} And put the
                  original tender in one envelope which <br /> will be sealed
                  and placed inside another cover. Outside cover shall also be
                  sealed. <br /> Please write the word “QUOTATION” on the top of
                  envelope and our Ref. # as well and also your address <br />{" "}
                  Payment will be made 100% on receipt of goods by the consignee
                  in good condition after inspection <br /> Please note that the
                  corporation reserve the right to reject all the quotation
                  without showing any cause <br /> Please quote your GST and
                  National Tax Number <br /> Final Payment will be made after
                  providing Annexure C.
                </p>
                <p style={{ pageBreakAfter: "always" }}></p>
              </div>
            ))}
        </div>
      </center>
    );
  }
}

export default Enquiry;
