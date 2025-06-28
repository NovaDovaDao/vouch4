// frontend/src/api/client.ts
import createClient from "openapi-fetch";
import type { paths } from "./types"; // Generated from openapi-typescript

// This creates a client for your API with type-safety based on your OpenAPI spec.
// Adjust the baseUrl to your actual backend API URL.
export const apiClient = createClient<paths>({
  baseUrl: "/api",
});

// You can also export common types for convenience
// export type User = components["schemas"]["UserDto"]; // Example: Assuming a UserDto schema exists
// export type LoginRequest = components["schemas"]["LoginRequestDto"];
// export type LoginResponse = components["schemas"]["LoginResponseDto"]; // Assuming this includes token and user data
