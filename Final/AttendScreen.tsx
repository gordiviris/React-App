import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import eventData from "./Events.json";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "./EventsStack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  image: string;
}

type AttendingNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "AttendScreen"
>;

const AttendingTab: React.FC = () => {
  const [attendingEvents, setAttendingEvents] = useState<EventData[]>([]);
  const navigation = useNavigation<AttendingNavigationProp>();

  const loadAttendingEventsFromAsyncStorage = async () => {
    try {
      const attendingEventIdsString = await AsyncStorage.getItem(
        "attendingEventIds"
      );

      if (attendingEventIdsString) {
        const attendingEventIds = JSON.parse(attendingEventIdsString);
        const attendingEventsData = eventData.filter((event) =>
          attendingEventIds.includes(event.id)
        );

        setAttendingEvents(attendingEventsData);
      } else {
        setAttendingEvents([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAttendingEventsFromAsyncStorage();
    }, [])
  );

  const navigateToEventDetail = (id: number) => {
    navigation.navigate("EventDetails", { id });
  };

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

  const imageSource = require(`./images/image1.jpg`);

  return (
    <View style={styles.container}>
      <FlatList
        data={attendingEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.attendingEventItem}
            onPress={() => navigateToEventDetail(item.id)}
          >
            <Image
              source={imageSource}
              style={styles.thumbnail}
              onError={(error) => console.error("Image loading error:", error)}
            />
            <View style={styles.attendingEventDetails}>
              <Text style={styles.attendingEventTitle}>{item.title}</Text>
              <Text>
                {formatDate(item.date)}, {convertTime(item.time)}
              </Text>
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
    backgroundColor: "white",
  },
  attendingEventItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  thumbnail: {
    width: "10%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    margin: 4,
  },
  attendingEventDetails: {
    marginLeft: 20,
  },
  attendingEventTitle: {
    fontSize: 20,
  },
});

export default AttendingTab;
