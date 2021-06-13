import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

const listAnimationName = [
  "Dragable",
  "Dragable-Decay",
  "ScrollChangeBackground",
  "Loop",
  "Spring-Scale",
  "Spring-Translate",
  "ChangeColor",
  "Easing",
  "Scale",
  "Sequence",
  "MoveToConner",
  "MoveToConner2",
  "StaggeredHead",
  "StaggerForm",
  "ProgressBar",
  "DynamicNotification",
  "Questionnaire",
  "Technique_99Cliff",
  "Svg_Flubber",
  "Canvas_Test",
  "PhotoGrid",
  "ToggleEditor",
  "ToggleEditorSample",
];

const renderItem = (name, navigation, index) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(name)}
      style={styles.itemContainer}
      key={index}
    >
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const DashBoard = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.centerItem}
    >
      {listAnimationName.map((e, index) => renderItem(e, navigation, index))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "red",
    fontSize: 16,
  },
  itemContainer: {
    paddingVertical: 12,
  },
});

export default DashBoard;
