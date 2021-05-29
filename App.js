import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Animation from "./src/basicAnimation/index";
import * as Advance from "./src/advance";
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
          name="ScrollChangeBackground"
          component={Animation.Animation_ScrollChangeBackground}
        />
        <RootStack.Screen
          name="Dragable"
          component={Animation.Animation_Dragable}
        />
        <RootStack.Screen name="Loop" component={Animation.Animation_Loop} />
        <RootStack.Screen
          name="Spring-Scale"
          component={Animation.Animation_Spring_Scale}
        />
        <RootStack.Screen
          name="Spring-Translate"
          component={Animation.Spring_Translate}
        />
        <RootStack.Screen
          name="ChangeColor"
          component={Animation.Animated_ChangeColor}
        />
        <RootStack.Screen name="Easing" component={Animation.Animated_Easing} />
        <RootStack.Screen name="Scale" component={Animation.Animated_Scale} />
        <RootStack.Screen
          name="Sequence"
          component={Animation.Animated_Sequence}
        />
        <RootStack.Screen
          name="MoveToConner"
          component={Advance.MoveToConner}
        />
        <RootStack.Screen
          name="MoveToConner2"
          component={Advance.MoveToConner2}
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
