import React from "react";
import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Se déconnecter"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
