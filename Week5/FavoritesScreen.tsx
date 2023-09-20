import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation, RouteProp, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "./ScannerStack";
import { SafeAreaView } from "react-native-safe-area-context";


type FavoriteItem = {
  url: string;
  title: string;
  image: string;
};

type FavoritesNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "FavoritesScreen"
>;


export function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const navigation = useNavigation<FavoritesNavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        const favorites = await loadFavoritesFromAsyncStorage();
        setFavorites(favorites);
      };

      loadFavorites();
    }, [])
  );


  const navigateToProductDetail = (url: string) => {
    navigation.navigate("ProductDetail", { url } );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.favoriteItem}
            onPress={() => navigateToProductDetail(item.url)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.thumbnail}
              onError={(error) => console.error("Image loading error:", error)}
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white"
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  thumbnail: {
    width: "10%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    margin: 4,
  },
  itemTitle:{
    marginLeft: 20,
    fontSize: 20
  }
});


const loadFavoritesFromAsyncStorage = async () => {
  try {
    const favoritesString = await AsyncStorage.getItem("favorites");
    const favorites = favoritesString ? JSON.parse(favoritesString) : [];
    return favorites;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
