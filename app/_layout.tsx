import { Tabs } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
        }}
      />
    </Tabs>
  );
}
