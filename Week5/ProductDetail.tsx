import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackParamList } from "./ScannerStack";
import { useFetch } from "./UseFetch";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductDetailNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "ProductDetail"
>;

type ProductDetailRouteProp = RouteProp<StackParamList, "ProductDetail">;

export function ProductDetail() {
  const { params } = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);

  const { productData, loading, error } = useFetch(params.url);

  const goBack = () => {
    navigation.goBack;
  };

  const toggleFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      let favorites = favoritesString ? JSON.parse(favoritesString) : [];

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((item: { url: string; }) => item.url !== params.url);
      } else {
        // Add to favorites
        favorites.push({ url: params.url, title: productData.title, image: productData.image});
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        const favorites = favoritesString ? JSON.parse(favoritesString) : [];
        const isProductInFavorites = favorites.some(
          (item: { url: string; }) => item.url === params.url
        );
        setIsFavorite(isProductInFavorites);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();
  }, [params.url]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Product details</Text>
        </View>

        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.favoriteButton}
        >
          <View style={[styles.heart, isFavorite && styles.favoriteHeart]} />
        </TouchableOpacity>
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && (
        <ScrollView style={styles.content}>
          <Image source={{ uri: productData.image }} style={styles.image} />

          <Text style={styles.title}>{productData.title}</Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{productData.category}</Text>
          </View>

          <Text style={styles.ratingText}>
            Rating: {productData.rating.rate} ({productData.rating.count})
          </Text>

          <Text style={styles.priceText}>${productData.price.toFixed(2)}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    margin: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: "blue", 
  },
  favoriteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heart: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 12,
  },
  favoriteHeart: {
    backgroundColor: "red",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  categoryContainer: {
    backgroundColor: "#39FF14",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
  },
  categoryText: {
    fontWeight: "bold",
    paddingVertical: 5,
  },
  ratingText: {
    fontWeight: "bold",
    marginVertical: 15,
    fontSize: 15,
  },
  priceText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#5536FF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  cartButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buyNowButton: {
    backgroundColor: "#313131",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  buyNowButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});
