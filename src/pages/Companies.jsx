import React, { Component } from "react";
import Pagination from "../components/Pagination";
import {
  getPaginatedCompanies,
  deleteCompany,
  saveCompany,
} from "../services/companyService";
import CompanyTable from "../components/CompanyTable";
import CompanyForm from "../components/CompanyForm";

export class Companies extends Component {
  state = {
    companies: [],
    data: { name: "", address: "", _id: false },
    loading: true,
    formLoading: false,
    error: false,
    limit: 8,
    pages: [],
    currentPage: 1,
  };

  async componentDidMount() {
    await this.loadCompanies();
    // const pages = lodash.range(this.state.companies.totalPages);
    let pages = [];
    for (let index = 1; index <= this.state.companies.totalPages; index++) {
      pages = [...pages, index];
    }

    this.setState({ pages });
  }

  loadCompanies = async () => {
    const { currentPage, limit } = this.state;
    this.setState({ loading: true });
    const { data } = await getPaginatedCompanies(currentPage, limit);

    this.setState({ loading: false, companies: data });
  };

  createCompany = async (e) => {
    e.preventDefault();
    let companies = this.state.companies;
    try {
      this.setState({ formLoading: true });
      const company = await saveCompany(this.state.data);
      this.setState({ error: false });
      if (this.state.data._id) {
        const pToUpdate = companies.results.find(
          (p) => p._id === this.state.data._id
        );
        const index = companies.results.findIndex((e) => e === pToUpdate);
        companies.results[index] = company.data.company;
      } else {
        companies.results = [...companies.results, company.data.company];
      }
      this.setState({
        companies,
        data: { name: "", address: "", _id: false },
        formLoading: false,
      });
      console.log("dddd", companies);
    } catch (error) {
      console.log("Company Error", error);

      return this.setState({
        error: "Company Already Exists",
        formLoading: false,
      });

      // this.setState({ error });
    }
  };
  removeCompany = async (company) => {
    await deleteCompany(company);
    const companies = this.state.companies;
    const results = companies.results.filter((p) => p._id !== company._id);
    this.setState((prevState) => {
      return { companies: { ...prevState.companies, results } };
    });
  };
  CompanyToUpdate = (company) => {
    this.setState({ data: { ...company } });
  };
  handleChange = ({ target }) => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(target);
    // if (errorMessage) errors[target.name] = errorMessage;
    // else delete errors[target.name];
    const data = this.state.data;
    data[target.name] = target.value;

    this.setState({ data });
  };

  onPageChange = async (page) => {
    await this.setState({ currentPage: page });
    this.loadCompanies();
  };
  render() {
    return (
      <div className="container">
        <p className="fs-2 text-center mt-3">Companies</p>
        <div className="row">
          <div className="col-md-6">
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <CompanyTable
                  companies={this.state.companies.results}
                  removeCompany={this.removeCompany}
                  CompanyToUpdate={this.CompanyToUpdate}
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
            <CompanyForm
              createCompany={this.createCompany}
              handleChange={this.handleChange}
              data={this.state.data}
              error={this.state.error}
              loading={this.state.formLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Companies;
