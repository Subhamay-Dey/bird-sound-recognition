import { Tabs } from "expo-router";

export default function tabslayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="/home"
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
