import axios from "axios"; 
import { BASE_URL } from "../constants";

const AxiosInstance = axios.create({
  baseURL :BASE_URL,
  headers: {
     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': "application/json",
  }, 
});

export default AxiosInstance;