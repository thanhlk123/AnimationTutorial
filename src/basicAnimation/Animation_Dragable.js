import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Animated, PanResponder, StyleSheet } from "react-native";

const MainScreen = () => {
  const [animation, setAnimation] = useState(new Animated.ValueXY(0));

  const _panResponder = useMemo(() => {
    let x = 0;
    let y = 0;
    animation.addListener((value) => {
      x = value.x;
      y = value.y;
    });
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animation.setOffset({
          x,
          y,
        });
        animation.setValue({
          x: 0,
          y: 0,
        });
        // animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: animation.x,
          dy: animation.y,
        },
      ]),
      onPanResponderRelease: (e, { vx, vy }) => {
        animation.flattenOffset();
      },
    });
  }, []);

  const animationStyle = {
    transform: animation.getTranslateTransform(),
  };

  console.log("_panResponder", _panResponder);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, animationStyle]}
        {..._panResponder.panHandlers}
      ></Animated.View>
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
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});

export default MainScreen;
