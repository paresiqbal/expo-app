import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";

// constants
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

// components
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

// services
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingmovies,
    loading: trendingloading,
    error: trendingerror,
  } = useFetch(getTrendingMovies);

  const {
    data: movie,
    loading: moviesloading,
    error: movieserror,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-gray-800">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView>
        {moviesloading || trendingloading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieserror || trendingerror ? (
          <Text>Error: {movieserror?.message || trendingerror?.message}</Text>
        ) : (
          <FlatList
            data={movie}
            contentContainerStyle={{
              paddingTop: 20,
              paddingHorizontal: 5,
              paddingBottom: 10,
            }}
            ListHeaderComponent={
              <>
                <Image source={icons.logo} className="w-12 h-10 mb-8 mx-auto" />
                <View className="flex-1 mt-5">
                  <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for movies"
                  />
                  {movie && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mb-3">
                        Trending Movies
                      </Text>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                        data={movie.slice(0, 5)}
                        className="mb-4 mt-3"
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                          <Text className="text-white text-sm">
                            {item.title}
                          </Text>
                        )}
                      />
                    </View>
                  )}
                </View>
                <Text className="text-lg font-bold text-white mt-5 mb-3">
                  Latest Movies
                </Text>
              </>
            }
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
}
