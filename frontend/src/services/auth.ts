import { $api } from "../api/client"; // Your openapi-fetch client

export const setPassword = async (
  token: string,
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { mutateAsync, error } = $api.useMutation(
      "post",
      "/auth/set-password"
    );
    const response = await mutateAsync({ body: { newPassword, token } });
    if (response) {
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
