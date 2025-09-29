import { Link } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { TextInput, Button } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await authClient.requestPasswordReset({ email });
      setSent(true);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ThemedView className="w-4/5">
        <ThemedText className="text-2xl font-bold text-center">
          Forgot Password
        </ThemedText>
        {error && (
          <ThemedText className="text-red-500 text-center">{error}</ThemedText>
        )}
        {sent ? (
          <ThemedText className="text-green-500 text-center mt-4">
            Password reset email sent. Please check your inbox.
          </ThemedText>
        ) : (
          <>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Button
              title={loading ? "Loading..." : "Request Password Reset"}
              onPress={handleForgotPassword}
              disabled={loading}
            />
          </>
        )}
        <ThemedView className="flex-row justify-center mt-4">
          <Link href="/(auth)/sign-in" asChild>
            <ThemedText type="link">Back to Sign In</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
