// frontend/src/services/auth.ts
import { apiClient, type User } from "../api/client"; // Your openapi-fetch client
import type { paths } from "../api/types"; // Generated API types

// Assuming your LoginRequest and LoginResponse DTOs are available in types.d.ts
type LoginRequestBody =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
type LoginResponseBody =
  paths["/auth/login"]["post"]["responses"]["201"]["content"]["application/json"];

// Assuming your SetPasswordRequest and ResetPasswordRequest DTOs are available
type SetPasswordRequestBody =
  paths["/auth/set-password"]["post"]["requestBody"]["content"]["application/json"];
// type ForgotPasswordRequestBody =
//   paths["/auth/forgot-password"]["post"]["requestBody"]["content"]["application/json"];
// type ResetPasswordRequestBody =
//   paths["/auth/reset-password"]["post"]["requestBody"]["content"]["application/json"];

const TOKEN_KEY = "jwt_token";
const USER_KEY = "user_data"; // Store user data separately if needed for quick access

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}> => {
  try {
    const { data, error, response } = await apiClient.POST("/auth/login", {
      body: { email, password } as LoginRequestBody, // Type assertion if openapi-fetch needs it for partial types
    });

    if (response.ok && data) {
      const { accessToken, user } = data as LoginResponseBody; // Cast to expected response type
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { success: true, user: user as User, token: accessToken }; // Ensure user matches your local `User` type
    } else {
      console.error(error);
      return { success: false, message: "Login failed. Invalid credentials." };
    }
  } catch (err) {
    console.error("Login API call failed:", err);
    return {
      success: false,
      message:
        (err as Error).message || "An unexpected error occurred during login.",
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const storedUser = localStorage.getItem(USER_KEY);
  if (storedUser) {
    try {
      // Return immediately if user data is in local storage and is valid
      const user = JSON.parse(storedUser) as User;
      // You might add a lightweight token validation here (e.g., check expiry if token is JWT)
      return user;
    } catch (e) {
      console.error("Failed to parse stored user data:", e);
      localStorage.removeItem(USER_KEY); // Clear corrupt data
    }
  }

  // If no user data or invalid, attempt to fetch profile using the token
  try {
    return null;
    // This assumes you have a /auth/profile or /users/me endpoint
    // and that openapi-fetch will automatically add the Authorization header
    // from a configured `auth` method if you set it up.
    // For simplicity here, we're assuming the token grants access to a profile endpoint.
    // const { data, error, response } = await apiClient.GET("/auth/profile", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (response.ok && data) {
    //   const user = data as User; // Cast to your local User type
    //   localStorage.setItem(USER_KEY, JSON.stringify(user)); // Update stored user data
    //   return user;
    // } else {
    //   console.error("Failed to fetch user profile:", error);
    //   localStorage.removeItem(TOKEN_KEY); // Clear invalid token
    //   localStorage.removeItem(USER_KEY);
    //   return null;
    // }
  } catch (err) {
    console.error("Get current user API call failed:", err);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setPassword = async (
  token: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error, response } = await apiClient.POST(
      "/auth/set-password",
      {
        body: { token, newPassword } as SetPasswordRequestBody,
      }
    );
    if (response.ok && data) {
      return {
        success: true,
        // message: data.message || "Password set successfully.",
      };
    } else {
      console.error(error);
      return {
        success: false,
        // message: error?.message || "Failed to set password.",
      };
    }
  } catch (err) {
    console.error("Set password API call failed:", err);
    return {
      success: false,
      message: (err as Error).message || "An unexpected error occurred.",
    };
  }
};

export const requestPasswordReset = async (
  email: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log({ email });
    return {
      success: true,
      message: " foo",
    };
    // const { data, error, response } = await apiClient.POST(
    //   "/auth/forgot-password",
    //   {
    //     body: { email } as ForgotPasswordRequestBody,
    //   }
    // );
    // if (response.ok && data) {
    //   return {
    //     success: true,
    //     message: data.message || "Password reset link sent successfully.",
    //   };
    // } else {
    //   return {
    //     success: false,
    //     message: error?.message || "Failed to request password reset.",
    //   };
    // }
  } catch (err) {
    console.error("Request password reset API call failed:", err);
    return {
      success: false,
      message: (err as Error).message || "An unexpected error occurred.",
    };
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log({ token, newPassword });
    return {
      success: true,
      message: " foo",
    };
    // const { data, error, response } = await apiClient.POST(
    //   "/auth/reset-password",
    //   {
    //     body: { token, newPassword } as ResetPasswordRequestBody,
    //   }
    // );
    // if (response.ok && data) {
    //   return {
    //     success: true,
    //     message: data.message || "Password reset successfully.",
    //   };
    // } else {
    //   return {
    //     success: false,
    //     message: error?.message || "Failed to reset password.",
    //   };
    // }
  } catch (err) {
    console.error("Reset password API call failed:", err);
    return {
      success: false,
      message: (err as Error).message || "An unexpected error occurred.",
    };
  }
};
