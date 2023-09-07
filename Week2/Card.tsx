import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface PhotoCardProps {
  url: string;
  onPress: () => void;
}

const Card: React.FC<PhotoCardProps> = ({ url, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: url }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

export default Card;
