import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsStack } from "./EventsStack";
import AttendScreen from "./AttendScreen";
import Ionicon from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Final: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
          headerShown: false,
          tabBarLabel: "Events",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: () => <Ionicon name="list" size={32} />,
        }}
      />
      <Tab.Screen
        name="AttendScreen"
        component={AttendScreen}
        options={{
          headerTitle: "Attending Tab",
          tabBarLabel: "Attending",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: () => <Ionicon name="heart" size={32} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Final;
