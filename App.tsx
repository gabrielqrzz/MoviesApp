// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PopularScreen from "./src/screens/PopularScreen";
import SearchScreen from "./src/screens/SearchScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

export type RootStackParamList = {
  Popular: undefined;
  Search: undefined;
  Details: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Popular" component={PopularScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
