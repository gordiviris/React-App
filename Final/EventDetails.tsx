import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackParamList } from "./EventsStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import jsonData from './Events.json';

type ProductDetailNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "EventDetails"
>;
type EventDetailRouteProp = RouteProp<StackParamList, "EventDetails">;

const eventsLength = jsonData.events.length



export function EventDetail() {
    const { params } = useRoute<EventDetailRouteProp>();
    const navigation = useNavigation<ProductDetailNavigationProp>();
  return (
    <View>
      <Text>Event Details</Text>
      <Text>Details</Text>
    </View>
  );
}
