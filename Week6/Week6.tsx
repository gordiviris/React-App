import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import BatterySDK from "./BatterySDK";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Accel } from "./Accelerometer";

const Tab = createBottomTabNavigator();

const Week6: React.FC = () => {
  return (
    <View style={styles.container}>
      <BatterySDK />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Week6;
