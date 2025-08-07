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

export type User = components["schemas"]["MeResponseDto"];
export type LoginRequest = components["schemas"]["LoginDto"];

export type CreateMember = components["schemas"]["CreateMemberDto"];
export type UpdateMember = components["schemas"]["UpdateMemberDto"];

export type CreateStaff = components["schemas"]["CreateStaffDto"];
export type UpdateStaff = components["schemas"]["UpdateStaffDto"];

export type GymClass =
  paths["/classes"]["get"]["responses"]["200"]["content"]["application/json"][0];
export type CreateClass = components["schemas"]["CreateClassDto"];
export type UpdateClass = components["schemas"]["UpdateClassDto"];

export type Gym =
  paths["/gyms"]["get"]["responses"]["200"]["content"]["application/json"][0];
export type CreateGym = components["schemas"]["CreateGymDto"];
export type UpdateGym = components["schemas"]["UpdateGymDto"];
