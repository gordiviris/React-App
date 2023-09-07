import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { StackParamList } from "./Week2";
import {
  RouteProp,
  useNavigation,
  useRoute,
  StackActions,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type PhotoModalScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "PhotoModal"
>;
type PhotoModalScreenRouteProp = RouteProp<StackParamList, "PhotoModal">;

export function PhotoModal() {
  const navigation = useNavigation<PhotoModalScreenNavigationProp>();
  const { params } = useRoute<PhotoModalScreenRouteProp>();

  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      navigation.navigate("PhotoCard", {
        ID: params.ID,
        url: params.url.toString(),
      });
      unsubscribe();
    });
    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={closeAndNavigate}>
        <View style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✖</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image source={{ uri: params.url.toString() }} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

PhotoModal.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "75%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 4,
  },
  closeButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 30,
  },
});

export default PhotoModal;
