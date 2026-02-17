import axios from "axios";

const BASE_URL = "http://localhost:3000/users";
const headers = { "Content-Type": "application/json" };

export async function fetchUsers() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function createUser(userData) {
  const res = await axios.post(BASE_URL, userData, { headers });
  return res.data;
}

export async function updateUser(id, updatedData) {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedData, { headers });
  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}
