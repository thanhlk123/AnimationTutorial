import React, { useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Animation_MoveToCorner = () => {
  const [animation, setAnimation] = useState(new Animated.ValueXY());
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const startAnimation = () => {
    Animated.sequence([
      Animated.spring(animation.y, {
        toValue: windowSize.height - boxSize.height,
        useNativeDriver: true,
      }),
      Animated.spring(animation.x, {
        toValue: windowSize.width - boxSize.width,
        useNativeDriver: true,
      }),
      Animated.spring(animation.y, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(animation.x, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const saveDimensions = (e) => {
    setBoxSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const saveWindowDimensions = (e) => {
    setWindowSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const animatedStyles = {
    transform: animation.getTranslateTransform(),
  };
  return (
    <View onLayout={saveWindowDimensions} style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View
          style={[styles.box, animatedStyles]}
          onLayout={saveDimensions}
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
    backgroundColor: "tomato",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Animation_MoveToCorner;
