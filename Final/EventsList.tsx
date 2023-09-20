import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "./EventsStack";
import { useNavigation } from "@react-navigation/native";


interface EventData {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
}

type EventsListNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "EventsList"
>;
export function EventsList() {
  const navigation = useNavigation<EventsListNavigationProp>();
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const importData = async () => {
        try{
            const response = require('./Events.json');
            setEvents(response);
        } catch (error){
            console.error('Error reading json file', error);
        }
    };
    importData();
  }, []);
  
  return (
    <View>
      <Text>Events list</Text>
      <FlatList
        data={events}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>(
            <View> 
                <Text>Name: {item.title} </Text>
                <Text>date: {item.date}</Text>
                <Text>Event</Text>
            </View>
        )}
      />
    </View>
  );
}
