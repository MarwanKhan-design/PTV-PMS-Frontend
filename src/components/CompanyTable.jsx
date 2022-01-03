import React from "react";
import { deleteAlert } from "../helpers/toastHelper";

const CompanyTable = ({ companies, removeCompany, CompanyToUpdate }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>
                {/* <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteAlert(company, removeCompany)}
                >
                  Delete
                </button>{" "} */}
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => CompanyToUpdate(company)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
