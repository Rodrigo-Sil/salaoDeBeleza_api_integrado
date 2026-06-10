import api from "./api";

export function loginAdmin(email, password) {
  return api.post("/auth/login", {
    email,
    password,
  });
}