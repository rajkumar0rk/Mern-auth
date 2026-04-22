import axios, { type CreateAxiosDefaults } from "axios";
import { UNAUTHORIZED } from "@/constants/http";
import queryClient from "./queryClient";
import { navigateTo } from "@/lib/navigatios";

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  withCredentials: true,
};

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // try to refresh the access token behind the scenes
    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        // refresh the access token, then retry the original request
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (err: unknown) {
        // handle refresh errors by clearing the query cache & redirecting to login
        const message = err instanceof Error ? err.message : String(err);
        console.log("Error in API interceptors", message);
        queryClient.clear();
        navigateTo("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }
    console.log("Unable to fetch Api", error);
    return Promise.reject({ status, ...data });
  },
);

export default API;
