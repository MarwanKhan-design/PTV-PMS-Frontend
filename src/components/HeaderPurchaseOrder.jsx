import React from "react";
import moment from "moment";

const HeaderPurchaseOrder = () => {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <table>
            <tbody>
              <tr className="fw-bold">
                <td>Purchase Order No. ______</td>
              </tr>
              <tr>
                <td>Ref. No. : PTV-P ______</td>
              </tr>
              <tr>
                <td>Tele: 091-9211889-98</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <table>
            <tbody>
              <tr className="text-decoration-underline">
                <td>
                  58, Shahrah-e-Quaid-e-Azam <br /> Peshawar
                </td>
              </tr>
              <tr>
                <td>Date: {moment(new Date()).format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                <td>
                  PTV NTN: <span className="fw-bold">0711560-1</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeaderPurchaseOrder;
