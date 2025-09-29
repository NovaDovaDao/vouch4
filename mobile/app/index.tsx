import { ThemedView } from "@/components/themed-view";
import { useSession } from "@/contexts/session-context";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { loading, session } = useSession();

  if (loading)
    return (
      <ThemedView className="flex-1 justify-center">
        <ActivityIndicator />
      </ThemedView>
    );

  if (session) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/sign-in" />;
}
