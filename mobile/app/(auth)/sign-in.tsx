import { Link, router } from "expo-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, TextInput, View, Text } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password)
        throw new Error("Email nor password can be empty");

      const response = await authClient.signIn.email({
        email,
        password,
      });

      console.log(response);

      if (response.data) router.push("/(tabs)");

      throw new Error("Unable to login", { cause: response.error });
    } catch (e) {
      console.info(e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1 justify-center items-center ">
      <ThemedView className="w-4/5">
        <ThemedText type="title">Sign In</ThemedText>
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        <TextInput
          className="border border-gray-300 rounded-md p-2 mt-4 dark:border-neutral-500 dark:text-neutral-400"
          placeholder="Email"
          value={email}
          textContentType="emailAddress"
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mt-4 dark:border-neutral-500 dark:text-neutral-400"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={loading ? "Loading..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />
        <ThemedView className="flex-row justify-between mt-4">
          <Link asChild href="/(auth)/sign-up">
            <ThemedText type="link">Sign Up</ThemedText>
          </Link>
          <Link href="/(auth)/forgot-password" asChild>
            <ThemedText type="link">Forgot Password?</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
