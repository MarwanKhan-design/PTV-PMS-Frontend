import React from "react";

const ProductForm = ({ createProduct, handleChange, data, error, loading }) => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => handleChange("name", e.target.value)}
            value={data.name}
          />
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            className="form-control"
            id="unit"
            onChange={(e) => handleChange("unit", e.target.value)}
            value={data.unit}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => createProduct(e)}
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
    </div>
  );
};

export default ProductForm;
