import AsyncStorage from "@react-native-async-storage/async-storage";

const getAttendingEvents = async () => {
  try {
    const attendingEventsJSON = await AsyncStorage.getItem("attendingEventIds");

    if (!attendingEventsJSON) {
      return [];
    }
    const attendingEvents = JSON.parse(attendingEventsJSON);

    return attendingEvents;
  } catch (error) {
    console.error("Error retrieving attending events getattend: ", error);
    return [];
  }
};

export default getAttendingEvents;
