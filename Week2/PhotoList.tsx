import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { StackParamList } from "./Week2";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface ImageData {
  id: number;
  url: string;
}

type PhotoListScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "PhotoList"
>;

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

const PhotoList: React.FC = () => {
  const verticalMargin = useSharedValue(2);
  const opacity = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // set our updated margin by adding our base margin of 2 to the scroll offset divided by 30
      // 30 is an arbitrary number that I chose to make the animation feel right
      const newMargin = 2 + event.contentOffset.y / 30;
      const newOpacity = opacity.value - 0.02;

      // We don't want the margin to ever be less than what we set in our style sheet so don't allow it go below 2
      if (newMargin < 2) {
        verticalMargin.value = 2;
        opacity.value = 1;
        // This is our max margin. We don't want it to go above 20. Set it to whatever you'd like.
      } else if (newMargin > 20) {
        verticalMargin.value = 20;
        opacity.value = 0.5;
      } else {
        // If the new margin is between 2 and 20, set the shared value to the new margin
        verticalMargin.value = newMargin;
        opacity.value = newOpacity;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: verticalMargin.value,
      opacity: opacity.value,
    };
  });

  const navigation = useNavigation<PhotoListScreenNavigationProp>();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage] = useState("");

  const filteredImages = imageData.filter((image) =>
    image.id.toString().includes(searchTerm)
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
        style={styles.searchInput}
      />
      {/* <FlatList
        data={filteredImages}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PhotoCard", { ID: item.id, url: item.url });
            }}
          >
            <Animated.Image
              sharedTransitionTag={`tag-${item.url}`}
              source={{ uri: item.url }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      /> */}
      <Animated.FlatList
        contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}
        numColumns={3}
        onScroll={scrollHandler}
        data={filteredImages}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("PhotoCard", { ID: item.id, url: item.url });
            }}
          >
            <Animated.Image
              sharedTransitionTag={`tag-${item.url}`}
              style={[styles.thumbnail, animatedStyle]}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={({ id }) => id.toString()}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
  },
  thumbnail: {
    margin: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  searchInput: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

export default PhotoList;
