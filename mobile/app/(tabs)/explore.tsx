import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Button, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Explore() {
  const [token, setToken] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setToken(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const generateToken = async () => {
    try {
      const response = await authClient.oneTimeToken.generate();

      if (response.error) throw new Error(response.error.message);

      setToken(response.data.token);
      setCountdown(60);
      setError(null);
    } catch (e) {
      setError("Failed to generate token. Please try again.");
      console.error(e);
    }
  };

  return (
    <ThemedView className="flex-1 justify-center items-center gap-4">
      <ThemedText type="title">Gym Access</ThemedText>
      {error && <ThemedText className="text-red-500">{error}</ThemedText>}
      {token ? (
        <View className="items-center gap-4">
          <QRCode value={token} size={200} />
          <ThemedText>This code will expire in {countdown} seconds</ThemedText>
        </View>
      ) : (
        <Button title="Generate Entry Code" onPress={generateToken} />
      )}
    </ThemedView>
  );
}
