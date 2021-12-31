import React, { Component } from "react";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
  getPaginatedProducts,
  deleteProduct,
  saveProduct,
} from "../services/productService";

export class Products extends Component {
  state = {
    paginatedProducts: [],
    products: [],
    data: { name: "", unit: "", _id: false },
    loading: true,
    formLoading: false,
    error: false,
    limit: 8,
    pages: [],
    currentPage: 1,
  };

  async componentDidMount() {
    await this.loadProducts();
    // const pages = lodash.range(this.state.products.totalPages);
    let pages = [];
    for (
      let index = 1;
      index <= this.state.paginatedProducts.totalPages;
      index++
    ) {
      pages = [...pages, index];
    }

    this.setState({ pages });
  }

  loadProducts = async () => {
    const { currentPage, limit } = this.state;
    this.setState({ loading: true });
    const { data } = await getPaginatedProducts(currentPage, limit);

    this.setState({ loading: false, paginatedProducts: data });
  };

  createProduct = async (e) => {
    e.preventDefault();
    let products = this.state.paginatedProducts;
    try {
      this.setState({ formLoading: true });
      const product = await saveProduct(this.state.data);
      this.setState({ error: false });
      if (this.state.data._id) {
        const pToUpdate = products.results.find(
          (p) => p._id === this.state.data._id
        );
        const index = products.results.findIndex((e) => e === pToUpdate);
        products.results[index] = product.data.product;
      } else {
        products.results = [...products.results, product.data.product];
      }
      this.setState({
        products,
        data: { name: "", unit: "", _id: false },
        formLoading: false,
      });
      console.log("dddd", products);
    } catch (error) {
      console.log("Product Error", error);

      return this.setState({
        error: "Product Already Exists",
        formLoading: false,
      });

      // this.setState({ error });
    }
  };
  removeProduct = async (product) => {
    await deleteProduct(product);
    const products = this.state.paginatedProducts.results;
    const results = products.filter((p) => p._id !== product._id);
    this.setState((prevState) => {
      return { paginatedProducts: { results } };
    });
  };
  ProductToUpdate = (product) => {
    this.setState({ data: { ...product } });
  };
  handleChange = (name, value) => {
    const data = this.state.data;
    data[name] = value;
    this.setState((prevState) => {
      return { data: { ...data, _id: prevState.data._id } };
    });
  };

  onPageChange = async (page) => {
    await this.setState({ currentPage: page });
    this.loadProducts();
  };
  render() {
    return (
      <div className="container">
        <p className="fs-2 text-center mt-3">Products</p>
        <div className="row">
          <div className="col-md-6">
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <ProductTable
                  products={this.state.paginatedProducts.results}
                  removeProduct={this.removeProduct}
                  ProductToUpdate={this.ProductToUpdate}
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
          <div className="col-md-6">
            <ProductForm
              createProduct={this.createProduct}
              handleChange={this.handleChange}
              data={this.state.data}
              error={this.state.error}
              loading={this.state.formLoading}
              products={this.state.products}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
