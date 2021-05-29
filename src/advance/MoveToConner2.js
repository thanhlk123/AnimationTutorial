import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const MoveToConner2 = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  const [animation, setAnimation] = useState(new Animated.ValueXY());

  const setDimentions = (e) => {
    setWindowSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const setBoxDimentions = (e) => {
    setBoxSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.spring(animation.y, {
        toValue: windowSize.height - boxSize.height,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.spring(animation.x, {
        toValue: windowSize.width - boxSize.width,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.spring(animation.y, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.delay(0),
      Animated.spring(animation.x, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const translateStyle = {
    transform: animation.getTranslateTransform(),
  };
  return (
    <View style={styles.container} onLayout={setDimentions}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View
          style={[styles.box, translateStyle]}
          onLayout={setBoxDimentions}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "yellow",
  },
});

export default MoveToConner2;
