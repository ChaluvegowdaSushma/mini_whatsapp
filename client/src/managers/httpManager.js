import axios from "axios";

const API_BASE_URL = "http://localhost:3002";

const searchUser = async (email) => {
  return await axios.get(`${API_BASE_URL}/search-user?email=${email}`);
};

const getChannelList = async (email) => {
  return await axios.get(`${API_BASE_URL}/channel-list?email=${email}`);
};


export const httpManager = {
  searchUser,
  getChannelList,

};
export default httpManager;
