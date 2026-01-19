import CustomTabBar from "@/components/BottomTabBar";
import { PortalHost } from "@rn-primitives/portal";
import { Slot, Tabs } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <PortalHost />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="collection"
          options={{
            title: "Collection",
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            href: null, // Hide from tab bar
          }}
        />
      </Tabs>
    </>
  );
}
