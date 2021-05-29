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
  "Paralle",
  "Scale",
  "Sequence",
];

const renderItem = (name, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(name)}
      style={styles.itemContainer}
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
      {listAnimationName.map((e) => renderItem(e, navigation))}
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
