import {
  CreateMemberDto,
  UpdateMemberDto,
} from "../../../backend/src/members/member.model.ts"; // Import DTOs from backend
// Note: You might want to copy these interfaces to frontend/src/types/member.ts
// to avoid importing directly from backend, ensuring loose coupling.
// For MVP, direct import is fine to save time.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Type for the Member object as received from API (might differ slightly from DTOs)
export interface Member {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string | null;
  walletAddress: string;
  membershipStatus: string;
  membershipType?: string | null;
  membershipNftId?: string | null;
  waiverStatus: string;
  waiverHash?: string | null;
  profilePicUrl?: string | null;
  createdAt: string; // Dates are typically strings from API
  updatedAt: string;
}

export const getMembers = async (): Promise<Member[]> => {
  const response = await fetch(`${API_BASE_URL}/members`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  return response.json();
};

export const getMemberById = async (id: number): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch member with ID ${id}`);
  }
  return response.json();
};

export const createMember = async (
  memberData: CreateMemberDto
): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
    body: JSON.stringify(memberData),
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Failed to create member");
  }
  return response.json();
};

export const updateMember = async (
  id: number,
  memberData: UpdateMemberDto
): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
    body: JSON.stringify(memberData),
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Failed to update member");
  }
  return response.json();
};

export const deleteMember = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Failed to delete member");
  }
};

export const checkInMember = async (memberId: number): Promise<Member> => {
  const response = await fetch(`${API_BASE_URL}/members/${memberId}/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + localStorage.getItem("authToken") || "",
    },
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Failed to check in member");
  }
  return response.json();
};
