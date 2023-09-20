import { Text, View, Image, StyleSheet } from "react-native";
import {
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "./EventsStack";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import Events from "./EventsDb";


interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  image: string;
}

type EventsListNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "EventsList"
>;


const EventsList: React.FC = () => {
  const navigation = useNavigation<EventsListNavigationProp>();

  const navigateToEventDetails = (id: number) => {
    navigation.navigate("EventDetails", { id });
  };
  const imageSource = require(`./images/image1.jpg`);

  function formatDate(date: string) {
    const dateParts = date.split("-");
    if (dateParts.length !== 3) {
      return "Invalid Date";
    }

    const [year, month, day] = dateParts;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[parseInt(month) - 1];
    const formattedDate = `${monthName} ${parseInt(day)}, ${year}`;

    return formattedDate;
  }

  function convertTime(time: string) {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours);
    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }
    return `${String(hour).padStart(2, "0")}:${minutes} ${period}`;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Events}
        numColumns={1} // Display 2 events per row
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.eventItem]}
            onPress={() => navigateToEventDetails(item.id)}
          >
            <View style={styles.content}>
              <Animated.Image
                sharedTransitionTag={`tag-${item.image}`}
                source={item.src}
                style={styles.thumbnail}
                // onError={(error) =>
                //   console.error("Image loading error:", error)
                // }
              />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemVenue}>{item.venue}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(item.date)}, {convertTime(item.time)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  thumbnail: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center", // Center the text vertically
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  itemVenue:{
    fontSize: 20
  },
  itemDate: {
    fontSize: 16,
    color: "gray",
  },
});

export default EventsList;
