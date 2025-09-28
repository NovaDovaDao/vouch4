import { Link } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function SetPassword() {
  const [newPassword, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSetPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await authClient.resetPassword({
        newPassword,
        token,
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-4/5">
        <Text className="text-2xl font-bold text-center">Set Password</Text>
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        {success ? (
          <Text className="text-green-500 text-center mt-4">
            Password has been reset successfully.
          </Text>
        ) : (
          <>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Token"
              value={token}
              onChangeText={setToken}
            />
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Password"
              value={newPassword}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              title={loading ? "Loading..." : "Set Password"}
              onPress={handleSetPassword}
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
