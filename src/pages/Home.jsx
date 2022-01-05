import React, { Component } from "react";
import { getPaginatedQuotations } from "../services/quotationService";

export class Home extends Component {
  state = {
    quotations: [],
    loading: false,
  };
  loadPaginatedData = async () => {
    this.setState({ loading: true });
    const { data } = await getPaginatedQuotations(1, 5);

    this.setState({ loading: false, quotations: data.results });
  };
  componentDidMount = () => {
    this.loadPaginatedData();
  };
  render() {
    const today = new Date();
    console.log("today", today);
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 mt-4">
            <p className="fs-4">Today is the last date of</p>
            <table className="table">
              <thead>
                <tr>
                  <td>Products</td>
                  <td>Last Date</td>
                </tr>
              </thead>
              <tbody>
                {this.state.quotations.map(
                  (quotation) =>
                    quotation.lastDate === today && (
                      <tr>
                        <td>
                          {quotation.products[0] &&
                            quotation.products[0].product.name}{" "}
                          ||{" "}
                          {quotation.products[1] &&
                            quotation.products[1].product.name}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

export default Home;
