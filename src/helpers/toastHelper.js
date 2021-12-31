import { toast } from "react-toastify";

export const deleteAlert = (d, bFunction) => {
  return toast(
    <div className="text-dark">
      Are you sure{" "}
      <button className="btn btn-danger" onClick={() => bFunction(d)}>
        Yes
      </button>{" "}
      <button className="btn btn-success">No</button>
    </div>
  );
};
