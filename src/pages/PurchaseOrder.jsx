import moment from "moment";
import React, { useState, Component, useRef } from "react";
import { useEffect } from "react/cjs/react.development";
import HeaderPurchaseOrder from "../components/HeaderPurchaseOrder";
import ReactToPrint from "react-to-print";

const PurchaseOrder = ({
  leastCompany,
  quotation,
  leastPrice,
  findTotalPrice,
}) => {
  const [companyBids, setCompanyBids] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const leastCompanyBids = () => {
    let companyBids2 = [];

    quotation.bids.find((b) => {
      if (b.company === leastCompany._id) {
        companyBids2 = [...companyBids2, b];
        console.log(companyBids2);
      }
    });
    console.log("asd", leastCompany);
    setCompanyBids(companyBids2);
  };
  const findQuantity = (b) => {
    const result = quotation.products.find(
      (p) => p.product._id === b.product._id
    );
    if (result !== undefined) {
      return result.quantity;
    } else {
      return;
    }
  };
  useEffect(() => {
    leastCompanyBids();
  }, [leastCompany]);
  const printRef = useRef();
  const pageStyle = `@page { size: portrait }`;
  return (
    <>
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-success mt-4">
              Print Purchase Order
            </button>
          )}
          pageStyle={pageStyle}
          content={() => printRef.current}
        />
      </center>
      <PurchaseOrderToPrint
        ref={printRef}
        companyBids={companyBids}
        findQuantity={findQuantity}
        findTotalPrice={findTotalPrice}
        leastCompany={leastCompany}
      />
    </>
  );
};

export class PurchaseOrderToPrint extends Component {
  render() {
    const { leastCompany, companyBids, findQuantity, findTotalPrice } =
      this.props;
    return (
      <div className="container text-start portrait">
        <center>
          <h4>Pakistan Television Corporation Limited</h4>
          <h4>Peshawar Center</h4>
        </center>
        <HeaderPurchaseOrder />
        <p className="fs-6">
          M/S{" "}
          <span className="fw-bold">
            {leastCompany.name} <br />
            {leastCompany.address}
          </span>
        </p>
        <p>Dear sir,</p>
        <p>
          We are pleased to accept your quotation No. PTB-P______ Dated:{" "}
          {moment(new Date()).format("DD/MM/YYYY")} and request <br /> you to
          supply the following goods by{" "}
          <span className="fw-bold">
            {moment(new Date()).format("DD/MM/YYYY")}
          </span>
        </p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>S. No.</td>
              <td>Description & Specifications of Materials</td>
              <td>Unit Price</td>
              <td>Qty</td>
              <td>TOTAL</td>
            </tr>
          </thead>
          <tbody>
            {companyBids.map((bid, i) => {
              const quantity = findQuantity(bid);
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{bid.product.name}</td>
                  <td>{bid.price}</td>
                  <td>{quantity}</td>
                  <td>{bid.price * quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fw-bold fs-6">Grand Total</td>
              <td className="text-end fw-bold fs-6">
                <span className="text-start">PKR </span>
                {findTotalPrice(leastCompany)[1]}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <p className="fw-bold">
          The Purchase Order is subjected to the following terms and conditions
        </p>
        <ul
          style={{ listStyle: "decimal", fontSize: "13px" }}
          className="fw-bold"
        >
          <li>
            The corporation reserves the right to cancel this order if the
            delivery cannot be made by <br /> the date as promised
          </li>
          <li>Goods must be properly insured and packed and</li>
          <li>All goods are subjected to inspection before final acceptance</li>
          <li>
            Please mention our purchase order No. and date on your invoice and
            send your
          </li>
          <li>invoice in duplicate. This is most important</li>
        </ul>
      </div>
    );
  }
}

export default PurchaseOrder;
