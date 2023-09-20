import { createStackNavigator } from "@react-navigation/stack";
import { EventsList } from "./EventsList";
import { EventDetail } from "./EventDetails";

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
        component={EventDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
