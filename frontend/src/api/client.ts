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
  async onResponse({ response }) {
    if (response.status === 401) {
      window.location.href = "/logout";
      return;
    }
    return response;
  },
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

export type User = components["schemas"]["UserLoginResponseDto"];
export type LoginRequest = components["schemas"]["LoginDto"];
export type LoginResponse = components["schemas"]["LoginResponseDto"];
export type CreateMember = components["schemas"]["CreateMemberDto"];
export type UpdateMember = components["schemas"]["UpdateMemberDto"];
