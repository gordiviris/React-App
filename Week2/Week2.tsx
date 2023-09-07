import React from "react";
import PhotoList from "./PhotoList";
import { StyleSheet } from "react-native";
import { PhotoCard } from "./PhotoCard";
import PhotoModal from "./PhotoModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamList = {
  PhotoList: undefined;
  PhotoCard: { ID: number; url: String };
  PhotoModal: { ID: number; url: String };
};

const Stack = createNativeStackNavigator<StackParamList>();

const Week2: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PhotoList">
      <Stack.Screen
        name="PhotoList"
        component={PhotoList}
        options={{ headerTitle: "Photo Gallery" }}
      />
      <Stack.Screen
        name="PhotoCard"
        component={PhotoCard}
        options={({ route }) => ({
          title: route.params.url.toString(),
        })}
      />
      <Stack.Screen
        name="PhotoModal"
        component={PhotoModal}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
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

export default Week2;
