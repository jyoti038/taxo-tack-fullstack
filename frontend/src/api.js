import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// CSV upload
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/upload/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Get all runs
export const getRuns = async () => {
  const response = await axios.get(`${API_URL}/runs/`);
  return response.data;
};

// Get specific run details
export const getRunById = async (id) => {
  const response = await axios.get(`${API_URL}/runs/${id}`);
  return response.data;
};
