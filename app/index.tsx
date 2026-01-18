import BirdSoundsCarousel from "@/components/BirdSoundsCarousel";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import SearchBar from "@/components/Searchbar";
import React from "react";
import { StyleSheet, View } from "react-native";

const home = () => {
  return (
    <View className="bg-white">
      <Header />
      <HeroBanner />
      <SearchBar />
      <BirdSoundsCarousel />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
