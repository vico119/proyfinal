// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia si usás otro puerto o estás en producción

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // solo si usás cookies/sesiones
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // debe devolver { user, token } como espera Login.jsx
};
export const getTasks = async () => {
  const res = await axios.get(`'/tasks`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`'/tasks`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`'/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`'/tasks/${id}`);
  return res.data;
};