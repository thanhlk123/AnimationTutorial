import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const BasicAnimated = ({ value = 90, typeRotate = "" }) => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    );
  };

  const degInterpolate = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const handleType = (type) => {
    switch (type) {
      case "x":
        return {
          transform: [{ rotateX: degInterpolate }],
        };
      case "y":
        return {
          transform: [{ rotateY: degInterpolate }],
        };
      default:
        return {
          transform: [{ rotate: degInterpolate }],
        };
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startAnimation()}>
        <Animated.View style={[styles.box, handleType(typeRotate)]} />
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
    backgroundColor: "orange",
  },
});

export default BasicAnimated;
