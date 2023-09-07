import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { StackParamList } from "./Week2";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated from "react-native-reanimated";

type PhotoCardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "PhotoCard"
>;
type PhotoCardScreenRouteProp = RouteProp<StackParamList, "PhotoCard">;

export function PhotoCard() {
  const navigation = useNavigation<PhotoCardScreenNavigationProp>();
  const { params } = useRoute<PhotoCardScreenRouteProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PhotoModal", { ID: params.ID, url: params.url });
        }}
      >
        <Animated.Image
          sharedTransitionTag={`tag-${params.url}`}
          source={{ uri: params.url.toString() }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{params.url.toString()}</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Nisl rhoncus mattis
        rhoncus urna neque viverra justo nec ultrices. Nisl nunc mi ipsum
        faucibus vitae aliquet nec ullamcorper. Augue interdum velit euismod in
        pellentesque massa placerat duis. Massa vitae tortor condimentum lacinia
        quis vel eros. Vivamus arcu felis bibendum ut. Mauris nunc congue nisi
        vitae. Morbi tincidunt ornare massa eget. Sollicitudin nibh sit amet
        commodo nulla facilisi nullam. Magna fermentum iaculis eu non diam
        phasellus vestibulum. Tincidunt augue interdum velit euismod in. Mi
        tempus imperdiet nulla malesuada pellentesque elit. Commodo quis
        imperdiet massa tincidunt nunc. Elementum nibh tellus molestie nunc non
        blandit. Est sit amet facilisis magna. Vel eros donec ac odio tempor
        orci dapibus. Egestas integer eget aliquet nibh praesent tristique
        magna. Ornare quam viverra orci sagittis eu. Ornare massa eget egestas
        purus viverra accumsan in. Facilisis sed odio morbi quis.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PhotoCard;
