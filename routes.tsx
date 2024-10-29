import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./pages/home";
import { List } from "./pages/lists";
import { FormList } from "./pages/formlist";

const Tab = createNativeStackNavigator();

export type StackParamList = {
  Home: undefined;
  Lists: { index: number };
  FormList: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackParamList>;

export function Stack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, animation: "flip" }}
        />
        <Tab.Screen
          name="Lists"
          component={List}
          options={{ headerShown: false, animation: "flip" }}
        />
        <Tab.Screen
          name="FormList"
          component={FormList}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
