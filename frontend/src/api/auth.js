import axiosClient, { ensureCsrfCookie } from "./axiosClient";

/**
 * All auth calls go through here. ensureCsrfCookie() MUST be awaited
 * before register/login — Sanctum SPA auth rejects the request otherwise
 * (mismatched/missing XSRF-TOKEN).
 */

export async function registerUser({ name, email, phone, password, password_confirmation }) {
  await ensureCsrfCookie();
  const { data } = await axiosClient.post("/api/v1/register", {
    name,
    email,
    phone,
    password,
    password_confirmation,
  });
  return data; // { message, user }
}

export async function loginUser({ email, password }) {
  await ensureCsrfCookie();
  const { data } = await axiosClient.post("/api/v1/login", { email, password });
  return data; // { message, user }
}

export async function logoutUser() {
  const { data } = await axiosClient.post("/api/v1/logout");
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await axiosClient.get("/api/v1/me");
  return data.user;
}