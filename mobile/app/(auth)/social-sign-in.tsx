import { authClient } from "@/lib/auth-client";
import { Button, View } from "react-native";
export default function SocialSignIn() {
  const handleLogin = async (provider: "google" | "facebook" | "apple") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard", // this will be converted to a deep link (eg. `myapp://dashboard`) on native
    });
  };
  return (
    <View className="flex-row justify-around mt-4">
      <Button title="Google" onPress={() => handleLogin("google")} />
      <Button title="Facebook" onPress={() => handleLogin("facebook")} />
      <Button title="Apple" onPress={() => handleLogin("apple")} />
    </View>
  );
}
