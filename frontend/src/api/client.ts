import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths, components } from "./types"; // Generated from openapi-typescript
import { AuthService } from "@/services/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"; // Make sure this matches your backend URL

const middleware = {
  async onRequest({ request }) {
    const authService = new AuthService();
    request.headers.set("authorization", `Bearer ${authService.token}`);
    return request;
  },
  // async onResponse({ response }) {
  //   // change status of response
  //   if (response.status === 401) {
  //     window.location.href = "/logout";
  //     return;
  //   }
  //   return response;
  // },
  // async onError({ error }) {
  //   // wrap errors thrown by fetch
  //   toast.error("Error", {
  //     description: error instanceof Error ? error.message : String(error),
  //   });
  //   return new Error("Oops, fetch failed");
  // },
} satisfies Middleware;

const fetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
});
fetchClient.use(middleware);

export const $api = createClient(fetchClient);

export const handleApiErrorMessage = (err: components["schemas"]["ErrorDto"]) =>
  Array.isArray(err.message)
    ? err.message.join(". ")
    : err.message || "An unexpected error occurred.";

// You can also export common types for convenience
export type User = components["schemas"]["UserLoginResponseDto"]; // Example: Assuming a UserDto schema exists
export type LoginRequest = components["schemas"]["LoginDto"];
export type LoginResponse = components["schemas"]["LoginResponseDto"]; // Assuming this includes token and user data
