import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value = "",
  onChangeText = () => {},
}: Props) => {
  return (
    <View className="flex-row items-center bg-gray-400 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8dff"
      />
      <TextInput
        onPress={() => {}}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
