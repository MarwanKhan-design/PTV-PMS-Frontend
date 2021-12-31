import React from "react";
import { deleteAlert } from "../helpers/toastHelper";

const ProductTable = ({ products, removeProduct, ProductToUpdate }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.unit}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteAlert(product, removeProduct)}
                >
                  Delete
                </button>{" "}
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => ProductToUpdate(product)}
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

export default ProductTable;
