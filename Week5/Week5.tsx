import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScannerStack from "./ScannerStack";
import { FavoritesScreen } from "./FavoritesScreen";
import { Scanner } from "./BarcodeScanner";


const Tab = createBottomTabNavigator();

const Week5: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ScannerTab"
        component={ScannerStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ headerTitle: "Favorites" }}
      />
    </Tab.Navigator>
  );
};

export default Week5;
