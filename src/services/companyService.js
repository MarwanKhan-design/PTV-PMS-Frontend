import http from "../services/httpService";

const companyApi = "http://localhost:8000/api/company";

export const getAllCompanies = async () => {
  return await http.get(`${companyApi}`);
};
export const getPaginatedCompanies = async (page, limit) => {
  return await http.get(`${companyApi}/paginated/?page=${page}&limit=${limit}`);
};
export const deleteCompany = async (company) => {
  try {
    // const Companies = this.state.Companies.filter((p) => p._id !== company._id);
    await http.delete(`${companyApi}/${company._id}`);
    // return Companies;
  } catch (error) {
    console.log(error);
  }
};

export const saveCompany = async (company) => {
  try {
    const body = { ...company };
    delete body._id;
    delete body.__v;
    if (company._id) {
      return http.put(`${companyApi}/${company._id}`, body);
    } else {
      return http.post(`${companyApi}/create`, body);
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};
