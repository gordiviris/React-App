import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Week5 from "./Week5/Week5";
import Week7 from "./Week7/Week7";
import Week2 from "./Week2/Week2";
import Week6 from "./Week6/Week6";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ShakeCharge"
        screenOptions={{ headerShown: false, drawerPosition: "right" }}
      >
        <Drawer.Screen name="Photo Gallery" component={Week2} />
        <Drawer.Screen name="Barcode Scanner" component={Week5} />
        <Drawer.Screen name="ShakeCharge" component={Week6} />
        <Drawer.Screen name="Week7" component={Week7} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
