import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAlert } from "../helpers/toastHelper";

const QuotationTable = ({
  quotations,
  removeQuotation,
  QuotationToUpdate,
  data,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Last Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
              <td>
                {quotation.products[0] && quotation.products[0].product.name} ||{" "}
                {quotation.products[1] && quotation.products[1].product.name}
              </td>
              <td>{moment(quotation.lastDate).format("DD/MM/YYYY")}</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/quotation/enquiry/${quotation._id}/all`}
                >
                  Enquiry
                </Link>{" "}
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => QuotationToUpdate(quotation)}
                >
                  Update
                </button>{" "}
              </td>
              <td>
                {/* <Link
                  className="btn btn-secondary btn-sm"
                  to={`/quotation/${quotation._id}`}
                >
                  Show
                </Link>{" "} */}
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/quotation/comparative/${quotation._id}`}
                >
                  Comparative
                </Link>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteAlert(quotation, removeQuotation)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTable;
