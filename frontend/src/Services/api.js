import axios from 'axios';

// Base URL for the backend API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Example function to create a new item
const createItem = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Example function to get items
const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/getItems`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  createItem,
  getItems,
};

