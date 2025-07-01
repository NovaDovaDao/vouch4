import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths, components } from "./types"; // Generated from openapi-typescript

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"; // Make sure this matches your backend URL

const fetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
});
export const $api = createClient(fetchClient);

export const handleApiErrorMessage = (err: components["schemas"]["ErrorDto"]) =>
  Array.isArray(err.message)
    ? err.message.join(". ")
    : err.message || "An unexpected error occurred.";

// You can also export common types for convenience
export type User = components["schemas"]["UserLoginResponseDto"]; // Example: Assuming a UserDto schema exists
export type LoginRequest = components["schemas"]["LoginDto"];
export type LoginResponse = components["schemas"]["LoginResponseDto"]; // Assuming this includes token and user data
