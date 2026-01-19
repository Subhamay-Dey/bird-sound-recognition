import Header from "@/components/Collection/Header";
import HomeScreen from "@/components/Collection/HomeScreen";
import React from "react";
import { StyleSheet, View } from "react-native";

const collection = () => {
  return (
    <View className="h-full bg-white">
      <Header />
      <HomeScreen />
    </View>
  );
};

export default collection;

const styles = StyleSheet.create({});
