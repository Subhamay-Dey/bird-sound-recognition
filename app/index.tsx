import BirdSoundsCarousel from "@/components/BirdSoundsCarousel";
import FeatureSection from "@/components/FeatureSection";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import SearchBar from "@/components/Searchbar";
import React from "react";
import { StyleSheet, View } from "react-native";

const Home = () => {
  return (
    <View className="bg-white">
      <Header />
      <HeroBanner />
      <SearchBar />
      <BirdSoundsCarousel />
      <FeatureSection />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
