import axios from "axios";

const API = axios.create({
  baseURL: "https://66d44b475b34bcb9ab3e2fd8.mockapi.io/api",
  timeout: 8000,
});

async function createUser(user) {
  try {
    const resource = "/users";
    const response = await API.post(resource, user);

    if (response.status !== 201) {
      throw new Error("Failed to create user");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export { createUser };