import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsStack } from "./EventsStack";
import { AttendScreen } from "./AttendScreen";

const Tab = createBottomTabNavigator();

const Final: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AttendScreen"
        component={AttendScreen}
        options={{ headerTitle: "Attending Tab" }}
      />
    </Tab.Navigator>
  );
};

export default Final;
