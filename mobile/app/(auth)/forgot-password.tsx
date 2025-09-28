import { Link } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

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
    <View className="flex-1 justify-center items-center">
      <View className="w-4/5">
        <Text className="text-2xl font-bold text-center">Forgot Password</Text>
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        {sent ? (
          <Text className="text-green-500 text-center mt-4">
            Password reset email sent. Please check your inbox.
          </Text>
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
        <View className="flex-row justify-center mt-4">
          <Link href="/(auth)/sign-in">Back to Sign In</Link>
        </View>
      </View>
    </View>
  );
}
