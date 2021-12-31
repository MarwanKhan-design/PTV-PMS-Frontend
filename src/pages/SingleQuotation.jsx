import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getQuotation } from "../services/quotationService";

const SingleQuotation = () => {
  const [quotation, setQuotation] = useState({});
  const { id } = useParams();
  const getSingleQuotation = async () => {
    const { data: quotation } = await getQuotation(id);
    setQuotation(quotation);
  };
  useEffect(() => {
    getSingleQuotation();
  }, []);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Companies</th>
            <th>Products</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {quotation.companies &&
                quotation.companies.map((company) => (
                  <span>{company.name} || </span>
                ))}
            </td>
            <td>
              {quotation.products &&
                quotation.products.map((product) => (
                  <span>{product.name} || </span>
                ))}
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                // onClick={() => removeQuotation(quotation)}
              >
                Delete
              </button>{" "}
              <button
                className="btn btn-success btn-sm"
                // onClick={() => QuotationToUpdate(quotation)}
              >
                Update
              </button>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleQuotation;
