import React, { Component } from "react";
import Pagination from "../components/Pagination";
import QuotationForm from "../components/QuotationForm";
import QuotationTable from "../components/QuotationTable";
import {
  getPaginatedQuotations,
  deleteQuotation,
  saveQuotation,
  getAllQuotations,
} from "../services/quotationService";
import {
  getAllProducts,
  saveProduct,
  searchProduct,
} from "../services/productService";
import { getAllCompanies } from "../services/companyService";
import Joi from "joi-browser";

export class Quotations extends Component {
  state = {
    quotations: [],
    products: [],
    companies: [],
    data: {
      products: [],
      _id: false,
      companies: [],
      bids: [],
      lastDate: new Date(),
      qtype: "normal",
      refNo: "PTV-P/PS/1110/21-22",
      from: "",
      demandDate: "",
      demandNumber: "",
    },
    loading: true,
    formLoading: false,
    error: false,
    limit: 4,
    pages: [],
    currentPage: 1,
    searchQuery: { name: "", unit: "" },
  };

  clearSearchData = () => {
    this.setState({ searchQuery: { name: "", unit: "" } });
  };

  async componentDidMount() {
    await this.loadPaginatedData();
    await this.loadCompany();
    await this.loadProducts();
    // const pages = lodash.range(this.state.quotations.totalPages);
    let pages = [];
    for (let index = 1; index <= this.state.quotations.totalPages; index++) {
      pages = [...pages, index];
    }

    this.setState({ pages });

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    var date = new Date();
    // console.log(date.addDays(7));
    this.setState({ data: { ...this.state.data, lastDate: date.addDays(7) } });
  }

  loadCompany = async () => {
    const { data: companies } = await getAllCompanies();
    this.setState({ companies });
  };
  loadProducts = async () => {
    const { searchQuery } = this.state;
    const { data: products } = await searchProduct(searchQuery, 1, 9);
    this.setState({ products });
  };
  handleSearch = (name, value) => {
    const searchQuery = this.state.searchQuery;
    searchQuery[name] = value;
    this.setState({ searchQuery });
    this.loadProducts();
  };

  loadPaginatedData = async () => {
    const { currentPage, limit } = this.state;
    this.setState({ loading: true });
    const { data } = await getPaginatedQuotations(currentPage, limit);

    this.setState({ loading: false, quotations: data });
  };

  validateQuotation() {
    const schema = {
      companies: Joi.array().required(),
      products: Joi.array().required(),
      bids: Joi.array().required(),
      lastDate: Joi.date().required(),
      qtype: Joi.string(),
      from: Joi.string(),
      demandDate: Joi.string(),
      demandNumber: Joi.string(),
    };

    return Joi.validate(this.state.data, schema);
  }

  createQuotation = async (e) => {
    e.preventDefault();
    const data = this.state.data;
    const validate = this.validateQuotation();
    for (let i = 0; i < data.products.length; i++) {
      data.products[i] = {
        product: data.products[i].product._id,
        quantity: data.products[i].quantity,
      };
    }
    for (let i = 0; i < data.companies.length; i++) {
      data.companies[i] = data.companies[i]._id;
    }

    let quotations = this.state.quotations;
    try {
      this.setState({ formLoading: true });
      if (validate.error) {
        this.setState({ error: validate.error.details });
      } else if (!validate.error) {
        this.setState({ error: false });
      }
      const quotation = await saveQuotation(data);
      console.log("&&&&&&&&&&&&&&&&&&", quotation.data);
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      var date = new Date();

      this.setState({ error: false });
      if (this.state.data._id) {
        const pToUpdate = quotations.results.find(
          (p) => p._id === this.state.data._id
        );
        const index = quotations.results.findIndex((e) => e === pToUpdate);
        quotations.results[index] = quotation.data;
      } else {
        quotations.results = [quotation.data.quotation, ...quotations.results];
        // this.setState({ quotations });
      }
      this.setState({
        data: {
          products: [],
          companies: [],
          bids: [],
          qtype: "normal",
          lastDate: date.addDays(7),
          refNo: "PTV-P/PS/1110/21-22",
          from: "",
          _id: false,
        },
      });
      this.setState({ formLoading: false });
    } catch (error) {
      return this.setState({
        formLoading: false,
      });

      // this.setState({ error });
    }
  };
  removeQuotation = async (quotation) => {
    await deleteQuotation(quotation);
    const quotations = this.state.quotations;
    const results = quotations.results.filter((p) => p._id !== quotation._id);
    this.setState((prevState) => {
      return { quotations: { ...prevState.quotations, results } };
    });
  };
  QuotationToUpdate = (quotation) => {
    quotation.lastDate = new Date(quotation.lastDate);
    this.setState({ data: { ...quotation } });
  };
  handlePriceChange = (product, company, price) => {
    const bids = this.state.data.bids;
    const bid = this.state.data.bids.find(
      (b) => b.product === product.product._id && b.company === company._id
    );
    bid.price = parseInt(price);
    const index = bids.findIndex(
      (b) => b.product === product.product._id && b.company === company._id
    );
    bids[index] = bid;
    this.setState({ data: { ...this.state.data, bids: bids } });
  };

  onPageChange = async (page) => {
    await this.setState({ currentPage: page });
    this.loadPaginatedData();
  };

  handleCheck = (item, name) => {
    const data = this.state.data;
    const findEx = (d) =>
      name === "products"
        ? d.product._id === item.product._id
        : d._id === item._id;

    const productFind = data[name].find((d) => findEx(d));
    if (productFind) {
      const exFind = (p) =>
        name === "products"
          ? p.product._id !== item.product._id
          : p._id !== item._id;
      const filterProducts = data[name].filter(exFind);
      data[name] = filterProducts;
    } else {
      data[name] = [...data[name], item];
    }
    this.setState({ data });
    this.updateBid();
  };

  updateBid = async () => {
    const { products, companies } = this.state.data;
    let bids = [];
    for (let c = 0; c < companies.length; c++) {
      for (let p = 0; p < products.length; p++) {
        bids = [
          ...bids,
          {
            company: companies[c]._id,
            product: products[p].product._id,
            price: 0,
          },
        ];
      }
    }
    this.setState({ data: { ...this.state.data, bids } });
  };

  handleDataChange = (name, value) => {
    const data = this.state.data;
    if (name === "lastDate") {
      value = new Date(value);
      data[name] = value;
      this.setState({ data });
    } else {
      data[name] = value;
      this.setState({ data });
    }
  };

  handleQuantity = (d, value) => {
    const data = this.state.data;
    const toUpdate = data.products.find((p) => p.product._id === d._id);
    if (toUpdate !== undefined) {
      const i = data.products.findIndex((p) => p.product._id === d._id);
      data.products[i].quantity = parseInt(value);
    }
    this.setState({ data });
  };

  findQuantity = (d) => {
    const data = this.state.data;
    const product = data.products.find((p) => p.product._id === d._id);
    return product.quantity;
  };

  addProduct = async (e) => {
    e.preventDefault();
    const { searchQuery, data } = this.state;
    let products = this.state.products;
    let dataProducts = this.state.data.products;
    try {
      const product = await saveProduct(searchQuery);
      products = [...products, product.data.product];
      dataProducts = [...dataProducts, { ...product.data, quantity: 1 }];
    } catch (error) {
      console.log(error);
    }
    this.setState({
      products: [...products],
      data: { ...data, products: dataProducts },
    });
    this.updateBid();
  };

  render() {
    return (
      <div className="container">
        <p className="fs-2 text-center mt-3">Quotations</p>
        <div className="row">
          <div className="col-md-7">
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <QuotationTable
                  quotations={this.state.quotations.results}
                  removeQuotation={this.removeQuotation}
                  QuotationToUpdate={this.QuotationToUpdate}
                  data={this.state.data}
                />
                <Pagination
                  onPageChange={this.onPageChange}
                  pages={this.state.pages}
                  currentPage={this.state.currentPage}
                  pagesCount={this.state.pages.length}
                />
              </>
            )}
          </div>
          <div className="col-md-5">
            {this.state.data._id ? (
              <h4 class="alert alert-success" role="alert">
                Update a Quotation
              </h4>
            ) : (
              <h4 class="alert alert-success" role="alert">
                Create a Quotation
              </h4>
            )}
            <QuotationForm
              createQuotation={this.createQuotation}
              handlePriceChange={this.handlePriceChange}
              handleCheck={this.handleCheck}
              data={this.state.data}
              error={this.state.error}
              loading={this.state.formLoading}
              products={this.state.products}
              companies={this.state.companies}
              searchQuery={this.state.searchQuery}
              handleDataChange={this.handleDataChange}
              handleQuantity={this.handleQuantity}
              findQuantity={this.findQuantity}
              handleSearch={this.handleSearch}
              loadProducts={this.loadProducts}
              addProduct={this.addProduct}
              clearSearchData={this.clearSearchData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Quotations;
