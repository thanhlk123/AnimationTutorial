import React from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MainScreen = () => {
  const animation = new Animated.Value(0);
  const textAnimation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 100,
        duration: 1000,
      }),
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 1500,
      }),
    ]).start();
  };

  const colorInterpolate = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#000000"],
  });
  const translateStyle = {
    transform: [{ translateY: animation }],
  };

  const colorStyle = {
    color: colorInterpolate,
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startAnimation()}>
        <Animated.View style={[styles.box, translateStyle]}>
          <Animated.Text style={colorStyle}>Hello world</Animated.Text>
        </Animated.View>
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
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;