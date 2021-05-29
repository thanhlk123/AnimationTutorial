import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MainScreen = ({ value = 2 }) => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start(() =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start()
    );
  };

  const colorInterpolate = animation.interpolate({
    inputRange: [1, 5],
    outputRange: ["#3b2bc4", "#c7696e"],
  });

  const animationStyle = {
    backgroundColor: colorInterpolate,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startAnimation()}>
        <Animated.View style={[styles.box, animationStyle]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,
  },
});

export default MainScreen;
