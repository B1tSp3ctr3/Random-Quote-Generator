import client from "./client";
const endpoint = "/api/register";
export const registerUser = (credentials) => {
  const data = new FormData();
  data.append("username", credentials.username);
  data.append("email", credentials.email);
  data.append("password", credentials.password);
  return client.post(endpoint, data);
};

export const loginUser = (credentials) => {
  const data = new FormData();
  data.append("email", credentials.email);
  data.append("password", credentials.password);
  return client.post("/api/auth", data);
};

export const logoutUser = () => {
  return client.post("/api/auth/logout");
};
