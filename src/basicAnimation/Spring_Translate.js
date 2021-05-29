import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MainScreen = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.spring(animation, {
      toValue: 200,
      friction: 2,
      tension: 100,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start()
    );
  };

  const animationStyleX = {
    transform: [
      {
        translateX: animation,
      },
    ],
  };

  const animationStyleY = {
    transform: [
      {
        translateY: animation,
      },
    ],
  };

  const animationStyle = {
    transform: [
      {
        translateX: animation,
      },
      {
        translateY: animation,
      },
    ],
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
    padding: 40,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "orange",
  },
});

export default MainScreen;
