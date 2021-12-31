import http from "../services/httpService";

const productApi = "https://ptv-pms.herokuapp.com/api/product";

export const getAllProducts = async () => {
  return await http.get(`${productApi}`);
};
export const getPaginatedProducts = async (page, limit) => {
  return await http.get(`${productApi}/paginated/?page=${page}&limit=${limit}`);
};
export const deleteProduct = async (product) => {
  try {
    // const products = this.state.products.filter((p) => p._id !== product._id);
    await http.delete(`${productApi}/${product._id}`);
    // return products;
  } catch (error) {
    console.log(error);
  }
};

export const saveProduct = async (product) => {
  try {
    const body = { ...product };
    delete body._id;
    delete body.__v;
    if (product._id) {
      return http.put(`${productApi}/${product._id}`, body);
    } else {
      return http.post(`${productApi}/create`, body);
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const searchProduct = async (searchQuery, page, limit) => {
  try {
    const body = { searchQuery, page, limit };
    delete body._id;
    delete body.__v;

    return await http.post(`${productApi}/search`, body);
  } catch (error) {
    return error;
  }
};
