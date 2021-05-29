import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";

const MainScreen = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animation_1, setAnimation_1] = useState(new Animated.Value(0));
  const [animation_2, setAnimation_2] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -10,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
        Animated.timing(animation_1, {
          toValue: -10,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
        Animated.timing(animation_1, {
          toValue: 0,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
        Animated.timing(animation_2, {
          toValue: -10,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
        Animated.timing(animation_2, {
          toValue: 0,
          duration: 200,
          easing: Easing.elastic(2),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animationStyle = {
    transform: [
      {
        translateY: animation,
      },
    ],
  };

  const animationStyle_1 = {
    transform: [
      {
        translateY: animation_1,
      },
    ],
  };
  const animationStyle_2 = {
    transform: [
      {
        translateY: animation_2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startAnimation()}>
        <View style={styles.row}>
          <Animated.View style={[styles.box, animationStyle]} />
          <Animated.View style={[styles.box, animationStyle_1]} />
          <Animated.View style={[styles.box, animationStyle_2]} />
        </View>
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
    width: 30,
    height: 30,
    marginRight: 20,
    backgroundColor: "orange",
  },
  row: {
    flexDirection: "row",
  },
});

export default MainScreen;
