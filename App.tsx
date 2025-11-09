import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PopularScreen from "./src/screens/PopularScreen";
import SearchScreen from "./src/screens/SearchScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { Text, View, StyleSheet, Button } from "react-native";
import { ThemeProvider, useTheme } from "./src/context/themeContext";

export type RootStackParamList = {
  Popular: undefined;
  Search: undefined;
  Details: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <NavigationContainer>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text, marginBottom: 20 }}>
          Tema atual: {themeName}
        </Text>
        <Button
          title="Alternar Tema"
          color={theme.primary}
          onPress={toggleTheme}
        />
      </View>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Popular" component={PopularScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  header: { flex: 0, padding: 20, marginTop: 40 }
});




