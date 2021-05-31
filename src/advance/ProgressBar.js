import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ProgressBar = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() =>
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start()
    );
  };

  let animatedWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  let animatedBg = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#3f07b0"],
  });

  let animatedTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#ffffff"],
  });
  const progressStyle = {
    width: animatedWidth,
    height: "100%",
    backgroundColor: animatedBg,
    opacity: animation,
  };

  const colorTransform = {
    color: animatedTextColor,
  };

  console.log("progressStyle", progressStyle);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn]} onPress={startAnimation}>
        <View style={styles.absoluteView}>
          <Animated.View style={progressStyle} />
        </View>
        <Animated.Text style={[styles.txt, colorTransform]}>
          Click me
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  absoluteView: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  txt: {
    fontSize: 16,
    alignSelf: "center",
  },
});

export default ProgressBar;
