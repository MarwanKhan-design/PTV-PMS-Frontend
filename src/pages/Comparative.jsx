import React, { useEffect, useState, Component, useRef } from "react";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import { getQuotation } from "../services/quotationService";
import PurchaseOrder from "./PurchaseOrder";

const Comparative = () => {
  const [quotation, setQuotation] = useState({
    companies: [],
    products: [],
    bids: [],
  });
  const [leastPrice, setLeastPrice] = useState(9999999999999999);
  const [leastCompany, setLeastCompany] = useState({});
  const { id } = useParams("id");
  const getSingleQuotation = async () => {
    const { data } = await getQuotation(id);
    setQuotation(data);
  };
  useEffect(() => {
    getSingleQuotation();
  }, []);
  useEffect(() => {
    findLeastPrice();
  });
  const findPrice = (product, company) => {
    const bid = quotation.bids.find(
      (b) => b.product._id === product.product._id && b.company === company._id
    );
    if (bid !== undefined) {
      return bid.price;
    } else {
      return;
    }
  };
  const findTotalPrice = (company) => {
    let price = { withQ: 0, withoutQ: 0 };
    quotation.bids.map((bid) => {
      const product = quotation.products.find(
        (p) => p.product._id === bid.product._id
      );
      if (bid.company === company._id) {
        price.withQ += bid.price;
        price.withoutQ += bid.price * product.quantity;
      }
    });
    return [price.withQ, price.withoutQ];
  };
  const findLeastPrice = () => {
    quotation.companies.map((company) => {
      const totalPrice = findTotalPrice(company);
      if (leastPrice > totalPrice[1]) {
        setLeastCompany(company);
        console.log("ddddddddd", company);
        setLeastPrice(totalPrice[1]);
      }
    });
  };
  const printRef = useRef();
  const printRef2 = useRef();
  const pageStyle = `@page { size: landscape }`;

  return (
    <>
      <center>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary mt-4">Print Comparative</button>
          )}
          content={() => printRef.current}
          pageStyle={pageStyle}
        />
      </center>
      <ComparativeToPrint
        quotation={quotation}
        findTotalPrice={findTotalPrice}
        leastPrice={leastPrice}
        leastCompany={leastCompany}
        findPrice={findPrice}
        ref={printRef}
      />

      <PurchaseOrder
        leastCompany={leastCompany}
        quotation={quotation}
        findTotalPrice={findTotalPrice}
        leastPrice={leastPrice}
      />
    </>
  );
};

export class ComparativeToPrint extends Component {
  render() {
    const { quotation, findTotalPrice, leastPrice, leastCompany, findPrice } =
      this.props;
    return (
      <div className="m-5 invert" style={{ fontSize: "12px" }}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <td></td>
              {quotation.companies.map((company) => (
                <th colSpan={2} key={company._id} className="text-center">
                  {company.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {quotation.companies.map((c) => (
                <>
                  <td>Rate</td>
                  <td>Per</td>
                </>
              ))}
            </tr>
            {quotation.products.map((product, i) => (
              <tr key={product.product._id}>
                <th>{product.product.name}</th>
                {quotation.companies.map((company) => (
                  <>
                    <td key={company._id}>
                      {findPrice(product, company) * product.quantity}
                    </td>
                    <td key={company._id}>{findPrice(product, company)}</td>
                  </>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
              {quotation.companies.map((company) => {
                const totalPrice = findTotalPrice(company);
                return leastPrice === totalPrice[1] ? (
                  <>
                    <th colSpan={2} className="text-center">
                      {totalPrice[1]}
                    </th>
                  </>
                ) : (
                  <>
                    <td colSpan={2} className="text-center">
                      {totalPrice[1]}
                    </td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
        <p className="fs-6 text-center">
          Quotation of M/S {leastCompany.name} may kindly be approved
        </p>
        <p style={{ pageBreakAfter: "always" }}></p>
      </div>
    );
  }
}

export default Comparative;
