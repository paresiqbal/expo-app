import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="bg-gray-900 flex-1">
      <ScrollView contentContainerStyle={{ padding: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.orh/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
