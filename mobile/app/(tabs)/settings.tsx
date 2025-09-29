import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSession } from "@/contexts/session-context";
import { Button } from "@react-navigation/elements";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <ThemedView className="flex-1">
      <ThemedText type="title">Settings</ThemedText>
      <Button variant="plain" onPress={signOut}>
        Logout
      </Button>
    </ThemedView>
  );
}
