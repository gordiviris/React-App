import { createStackNavigator } from "@react-navigation/stack";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";

export type StackParamList = {
  EventsList: undefined;
  EventDetails: { id: number };
  AttendScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventsList"
        component={EventsList}
        options={{ headerTitle: "Events" }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
