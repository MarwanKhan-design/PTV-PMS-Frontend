import moment from "moment";
import React from "react";
import { Fragment } from "react";

const QuotationForm = ({
  createQuotation,
  handlePriceChange,
  data: formData,
  error,
  loading,
  products,
  handleCheck,
  companies,
  handleDataChange,
  handleQuantity,
  findQuantity,
  handleSearch,
  loadProducts,
  addProduct,
  clearSearchData,
  searchQuery,
}) => {
  const findPriceValue = (p, c) => {
    const price = formData.bids.find(
      (b) => b.product === p.product._id && b.company === c._id
    );
    if (price !== undefined) {
      return price.price;
    } else {
      return;
    }
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    loadProducts();
  };
  const findIfChecked = (item, name) => {
    const toFind = formData[name];
    const ex = (d) => {
      return name === "products"
        ? d.product._id === item._id
        : d._id === item._id;
    };
    const itemFind = toFind.find((d) => ex(d));
    if (itemFind === undefined) {
      return false;
    } else {
      return true;
    }
  };
  const checkMap = (data, name) => {
    return (
      <>
        <p className="fs-5 text-uppercase">{name}</p>
        {name === "products" && (
          <>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              value={searchQuery.name}
              onChange={(e) => handleSearch("name", e.target.value)}
              id="name"
            />
            <br />
            <label htmlFor="unit">Unit</label>
            <br />
            <input
              type="text"
              onChange={(e) => handleSearch("unit", e.target.value)}
              value={searchQuery.unit}
              id="unit"
            />
            <br />
            <button
              onClick={(e) => handleSearchClick(e)}
              className="btn btn-primary mt-2"
            >
              Search
            </button>{" "}
            <button
              className="btn btn-primary mt-2"
              onClick={(e) => {
                addProduct(e);
                clearSearchData();
              }}
            >
              Add Product
            </button>
            <br />
            <br />
          </>
        )}
        {data &&
          data.map((d) => {
            const dToCheck =
              name === "products" ? { product: d, quantity: 1 } : d;
            return (
              <div className="form-group" key={d._id}>
                {findIfChecked(d, name) && name === "products" && (
                  <input
                    type="number"
                    className="m-1"
                    id={d.name + "check"}
                    onChange={(e) => handleQuantity(d, e.target.value)}
                    value={findQuantity(d)}
                    style={{ width: "40px" }}
                  />
                )}
                <input
                  type="checkbox"
                  className=""
                  id={d.name + "check"}
                  checked={findIfChecked(d, name)}
                  onChange={() => handleCheck(dToCheck, name)}
                  value={data.name}
                />{" "}
                <label htmlFor={d.name + "check"}>{d.name}</label>
              </div>
            );
          })}
      </>
    );
  };
  const findError = (name) => {
    const errorMessage = error && error[0].path[0] === name && error[0].message;

    return (
      errorMessage && <div className="alert alert-danger">{errorMessage}</div>
    );
  };

  return (
    <div>
      <form autoComplete="off">
        <div class="card text-dark bg-info mb-3 mt-3">
          <div class="card-header fs-4 fw-bold">Demand</div>
          <div class="card-body">
            <h5 class="card-title">Fill this from requisition form</h5>
            <div className="row">
              <div className="col form-group">
                <label htmlFor="from">From</label>
                <br />
                <input
                  type="text"
                  id="from"
                  value={formData.from}
                  onChange={(e) => handleDataChange("from", e.target.value)}
                />
                {findError("from")}
              </div>
              <div className="col form-group">
                <label htmlFor="demandDate">Demand Date</label>
                <br />
                <input
                  type="date"
                  id="demandDate"
                  value={formData.demandDate}
                  onChange={(e) =>
                    handleDataChange("demandDate", e.target.value)
                  }
                />
                {findError("demandDate")}
              </div>
              <div className="col form-group">
                <label htmlFor="demandNumber">Demand Number</label>
                <br />
                <input
                  type="text"
                  id="demandNumber"
                  value={formData.demandNumber}
                  onChange={(e) =>
                    handleDataChange("demandNumber", e.target.value)
                  }
                />
                {findError("demandNumber")}
              </div>
            </div>
          </div>
        </div>
        <div class="card text-dark bg-warning mb-3">
          <div class="card-header">Enquiry</div>
          <div class="card-body">
            <div className="row">
              <div className="form-group col">
                <label htmlFor="lastDate">Last Date</label>
                <br />
                <input
                  type="date"
                  id="lastDate"
                  value={formData.lastDate.toISOString().substr(0, 10)}
                  onChange={(e) => handleDataChange("lastDate", e.target.value)}
                />

                {findError("lastDate")}
              </div>
              <div className="form-group col">
                <label htmlFor="qtype">Q type</label>
                <br />

                <select
                  id="qtype"
                  onChange={(e) => handleDataChange("qtype", e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="spot">Spot</option>
                </select>
                {findError("qtype")}
              </div>
              <div className="form-group col">
                <label htmlFor="rafNo">Ref No</label>
                <br />
                <input
                  type="text"
                  id="refNo"
                  value={formData.refNo}
                  onChange={(e) => handleDataChange("refNo", e.target.value)}
                />
                {findError("refNo")}
              </div>
            </div>
            <h5 class="card-title mt-4">Companies</h5>
            {formData.companies.map((company) => (
              <>{company.name}, </>
            ))}

            <h5 class="card-title mt-4">Products</h5>
            {formData.products.map((product) => (
              <>
                {product.product.name}{" "}
                <span className="fw-bold">
                  ({findQuantity(product.product)})
                </span>{" "}
                ,{" "}
              </>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            {products.length > 0 ? (
              checkMap(products, "products")
            ) : (
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}{" "}
          </div>
          <div className="col-6">
            {" "}
            {companies.length > 0 ? (
              checkMap(companies, "companies")
            ) : (
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}{" "}
          </div>
        </div>
        <div className="row">
          {formData.companies.map((c) => (
            <Fragment key={c._id}>
              <div className="col-6">
                <p className="fs-5">{c.name}</p>
                {formData.products.map((p) => (
                  <Fragment key={p._id}>
                    <div className="form-group">
                      <label htmlFor={p.name + c.name}>{p.product.name}</label>
                      <input
                        type="number"
                        id={p.name + c.name}
                        value={findPriceValue(p, c)}
                        className="form-control"
                        onChange={(e) =>
                          handlePriceChange(p, c, e.target.value)
                        }
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => createQuotation(e)}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <> {formData._id ? "Update" : "Create"} </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QuotationForm;
