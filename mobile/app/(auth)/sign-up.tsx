import { Link } from "expo-router";
import { useState } from "react";
import { TextInput, Button } from "react-native";
import { authClient } from "@/lib/auth-client";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        firstName: "Alex",
        lastName: "Valle",
      });
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ThemedView className="w-4/5">
        <ThemedText type="title">Sign Up</ThemedText>
        {error && (
          <ThemedText className="text-red-500 text-center">{error}</ThemedText>
        )}
        <TextInput
          className="border border-gray-300 rounded-md p-2 mt-4"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mt-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mt-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={loading ? "Loading..." : "Sign Up"}
          onPress={handleLogin}
          disabled={loading}
        />
        <ThemedView className="flex-row justify-center mt-4">
          <Link href="/(auth)/sign-in" asChild>
            <ThemedText type="link">
              Already have an account? Sign In{" "}
            </ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
