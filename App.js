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
        <RootStack.Screen
          name="StaggeredHead"
          component={Advance.StaggeredHead}
        />
        <RootStack.Screen name="StaggerForm" component={Advance.StaggerForm} />
        <RootStack.Screen name="ProgressBar" component={Advance.ProgressBar} />
        <RootStack.Screen
          name="DynamicNotification"
          component={Advance.DynamicNotification}
        />
        <RootStack.Screen
          name="Questionnaire"
          component={Advance.Questionnaire}
        />
        <RootStack.Screen
          name="Technique_99Cliff"
          component={Advance.Technique_99Cliff}
        />
        <RootStack.Screen name="Svg_Flubber" component={Advance.Svg_Flubber} />
        <RootStack.Screen name="Canvas_Test" component={Advance.Canvas_Test} />
        <RootStack.Screen name="PhotoGrid" component={Advance.PhotoGrid} />
        <RootStack.Screen
          name="ToggleEditor"
          component={Advance.ToggleEditor}
        />
        <RootStack.Screen
          name="ToggleEditorSample"
          component={Advance.ToggleEditorSample}
        />
        <RootStack.Screen
          name="FloatingActionButton"
          component={Advance.FloatingActionButton}
        />
        <RootStack.Screen
          name="EvolvingWriteButton"
          component={Advance.EvolvingWriteButton}
        />
        <RootStack.Screen
          name="EvolvingSample"
          component={Advance.EvolvingSample}
        />
        <RootStack.Screen
          name="SocialComment"
          component={Advance.SocialComment}
        />
        <RootStack.Screen
          name="SocialCommentSample"
          component={Advance.SocialCommentSample}
        />
        <RootStack.Screen name="LoveButton" component={Advance.LoveButton} />
        <RootStack.Screen name="HeartBtn" component={Advance.HeartBtn} />
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
