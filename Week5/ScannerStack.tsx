import { createStackNavigator } from "@react-navigation/stack";
import { Scanner } from "./BarcodeScanner";
import { ProductDetail } from "./ProductDetail";

export type StackParamList = {
  Scanner: undefined;
  ProductDetail: { url: string };
  FavoritesScreen: { url: string };
};

const Stack = createStackNavigator<StackParamList>();

const ScannerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Scanner"
      component={Scanner}
      options={{ headerTitle: "Scanner" }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ScannerStack;
