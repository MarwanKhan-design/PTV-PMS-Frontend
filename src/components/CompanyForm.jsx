import React, { Component } from "react";

export class CompanyForm extends Component {
  render() {
    const { createCompany, handleChange, data, error, loading } = this.props;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={data.name}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            onChange={(e) => handleChange(e)}
            value={data.address}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => createCompany(e)}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
    );
  }
}

export default CompanyForm;
