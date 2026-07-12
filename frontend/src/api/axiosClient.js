import axios from "axios";

// Base URL for the Laravel backend. Set in frontend/.env as VITE_API_URL.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Central Axios instance — every API module (auth.js, products.js, cart.js, etc.)
 * imports THIS client. Never call axios directly from a component or context.
 *
 * withCredentials: true is required for Laravel Sanctum's SPA (cookie-based)
 * auth to work — it sends the session + XSRF-TOKEN cookies with every request.
 */
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true, // lets axios read the XSRF-TOKEN cookie and attach it as a header automatically
  headers: {
    Accept: "application/json",
  },
});

/**
 * Sanctum requires hitting /sanctum/csrf-cookie once before the first
 * state-changing request (login, register, POST/PATCH/DELETE) in a session.
 * Call this before login/register; axios then handles the token automatically
 * on every subsequent request via withXSRFToken.
 */
export const ensureCsrfCookie = () =>
  axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });

// Global response interceptor — centralizes 401 (logged out) and 419 (CSRF
// token expired) handling so individual API calls don't each need try/catch
// boilerplate for these two common cases.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired / not authenticated — let AuthContext (next step) react to this
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;