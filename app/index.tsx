import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import React from "react";
import { StyleSheet, View } from "react-native";

const home = () => {
  return (
    <View>
      <Header />
      <HeroBanner />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
