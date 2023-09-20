import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getAttendingEvents from "./getAttendingEvents";
import { StackParamList } from "./EventsStack";
import * as calendar from 'expo-calendar';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicon from "@expo/vector-icons/Ionicons";
import * as Sharing from 'expo-sharing';
import Animated from "react-native-reanimated";
import Events from "./EventsDb";
import { Share } from "react-native";
import Contacts from "react-native-contacts";
import { PushNotification } from "react-native";


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

type EventDetailNavigationProp = StackNavigationProp<
  StackParamList,
  "EventDetails"
>;
type EventDetailRouteProp = RouteProp<StackParamList, "EventDetails">;


const EventDetails: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { params } = useRoute<EventDetailRouteProp>();
  const navigation = useNavigation<EventDetailNavigationProp>();
  const [isAttending, setIsAttending] = useState<boolean>(false);

  const event = Events.find((item) => item.id === params.id);


  async function requestContactPermissions() {
    try {
      await Contacts.requestPermission();
      console.log("Contact permissions granted.");
    } catch (error) {
      console.error("Error requesting contact permissions:", error);
      Alert.alert("Error", "Failed to request contact permissions.");
    }
  }

  useEffect(() => {
    const getCalendarPermissions = async () => {
      const { status } = await calendar.requestCalendarPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCalendarPermissions();
  }, []);

  useEffect(() => {
    if (event) {
      const checkAttendingStatus = async () => {
        const attendingEvents = await getAttendingEvents();
        setIsAttending(attendingEvents.includes(event.id));
      };

      checkAttendingStatus();
    }
  }, [event]);


  async function shareEvent(imageUri: string) {
    try {
      const result = await Share.share({
        title: "Event",
        message: "Check out this event!",
        url: imageUri,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share canceled");
      }
    } catch (error) {
      console.error("Error sharing event:", error);
      Alert.alert(
        "Error",
        "Failed to share the event. Please try again later."
      );
    }
  }




  const handleAttendPress = async () => {
    try {
      if (event) {
        const attendingEvents = await getAttendingEvents();

        const index = attendingEvents.indexOf(event.id);
        if (index !== -1) {
          attendingEvents.splice(index, 1);
          setIsAttending(false);
        } else {
          attendingEvents.push(event.id);
          setIsAttending(true);
        }
        await AsyncStorage.setItem(
          "attendingEventIds",
          JSON.stringify(attendingEvents)
        );
      }
    } catch (error) {
      console.error("Error toggling attendance: ", error);
    }
  };

  const addEvent = async () => {
    try {
      if (!hasPermission) {
        console.error("Calendar permission not granted");
        return;
      }

      if (!event) {
        console.error("Event data not available");
        return;
      }

      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: "Expo Calendar" };

      const newCalendarID = await calendar.createCalendarAsync({
        title: "Expo Calendar",
        color: "blue",
        entityType: calendar.EntityTypes.EVENT,
        sourceId: (defaultCalendarSource as calendar.Source).id,
        source: defaultCalendarSource as calendar.Source,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: calendar.CalendarAccessLevel.OWNER,
      });

      if (newCalendarID) {
        const startDate = new Date(event.date + " " + event.time); 
        const endDate = new Date(event.date + " " + event.time); 

        await calendar.createEventAsync(newCalendarID, {
          title: event.title,
          startDate,
          endDate,
          location: event.venue,
          notes: event.description,
        });

        console.log("Event added to calendar successfully.");
      } else {
        console.error("Failed to create a new calendar.");
      }
    } catch (error) {
      console.error("Error adding event to calendar: ", error);
    }
    console.log("button pressed");
    Alert.alert('Event Added!', 'Event has been added to your Calendar.', )
  };

  function formatDate(date: string){
    const dateParts = date.split("-");
    if(dateParts.length !== 3){
      return "Invalid Date"
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

  function convertTime(time: string){
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours);
    if(hour >= 12){
      period = "PM";
      if(hour > 12){
        hour -= 12;
      }
    }
    return `${String(hour).padStart(2, "0")}:${minutes} ${period}`;
  }

  const imageSource = require('./images/image1.jpg');

  if (!event) {
    return (
      <View>
        <Text>Event not Found!</Text>
      </View>
    );
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.posAdjust}>
        <ScrollView>
          {/* image */}
          <Animated.Image
            sharedTransitionTag={`tag-${event.image}`}
            style={[styles.image]}
            source={event.src}
            resizeMode="contain"
          />

          {/* content */}
          <View style={styles.content}>
            <Text style={styles.title}>{event.title}</Text>

            {/* category */}
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>

            {/* Date and time */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>When: </Text>
              <Text style={styles.dateText}>{formatDate(event.date)}</Text>
              <Text style={styles.timeText}>
                Starts: {convertTime(event.time)}
              </Text>
            </View>

            {/* Location */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Where:</Text>
              <Text style={styles.venueText}>{event.venue}</Text>
              <Text style={styles.addressText}>{event.address}</Text>
            </View>

            {/* Description */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>About this event: </Text>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.addAttendBtn,
                  {
                    backgroundColor: isAttending ? "red" : "white",
                  },
                ]}
                onPress={handleAttendPress}
              >
                <Text style={styles.addAttendText}>
                  {isAttending ? (
                    <Ionicon name="heart" size={32} color="white" />
                  ) : (
                    <Ionicon name="heart-outline" size={32} color="red" />
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addCalendarBtn}
                onPress={addEvent}
              >
                <Text style={styles.addCalendarText}>Add to Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={()=>(shareEvent(event.url))}
              >
                <Ionicon name="share" size={32} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 30,
    left: 0,
    padding: 10,
  },
  posAdjust: {
    top: 20,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  categoryContainer: {
    backgroundColor: "#39FF14",
    borderRadius: 20,

    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  categoryText: {
    fontWeight: "bold",
    paddingVertical: 5,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 10,
  },
  dateText: {
    fontWeight: "700",
    fontSize: 20,
  },
  timeText: {
    fontWeight: "500",
    fontSize: 15,
  },
  venueText: {
    fontWeight: "600",
    fontSize: 18,
  },
  addressText: {
    fontWeight: "400",
    fontSize: 15,
  },
  descriptionText: {
    fontWeight: "400",
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },
  addAttendBtn: {
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 2,
  },
  addAttendText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  addCalendarBtn: {
    backgroundColor: "#313131",
    borderRadius: 20,
    height: 60,
    marginTop: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  addCalendarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  shareButton: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 5,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
  },
});

export default EventDetails;

async function getDefaultCalendarSource() {
  const defaultCalendar = await calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}
