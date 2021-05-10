import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Animation from "./src/basicAnimation/index";
import DashBoard from "./src/DashBoard";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="Dragable-Decay"
          component={Animation.Animation_Decay}
        />
        <RootStack.Screen
          name="Dragable"
          component={Animation.Animation_Dragable}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
