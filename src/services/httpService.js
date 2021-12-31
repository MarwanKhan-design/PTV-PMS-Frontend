import axios from "axios";
import { toast } from "react-toastify";
// import logger from "./logService";
// import auth from "./auth";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // logger.log(error);
    console.log("INTERCEPTOR CALLED");
    // alert("An unexpected error occurred");
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const toDefaultExport = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default toDefaultExport;
