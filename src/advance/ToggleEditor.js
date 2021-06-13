import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { Foundation as Icon } from "@expo/vector-icons";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ToggleEditor = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [color, setColor] = useState("#000");
  const [inputOpen, setInputOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const inputRef = useRef(null);

  const toggleInput = () => {;
    Animated.timing(buttonAnimation, {
      toValue: inputOpen ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setInputOpen(!inputOpen));
  };

  const handleToggle = () => {
    Animated.timing(animation, {
      toValue: toggle ? 0 : 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => setToggle(!toggle));
  };

  const opacityIconInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const iconTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const iconStyle = {
    opacity: opacityIconInterpolate,
    transform: [
      {
        translateX: iconTranslate,
      },
    ],
  };

  const colorStyle = {
    backgroundColor: color,
  };

  const inputOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const inputStyle = {
    opacity: inputOpacityInterpolate,
  };

  const colorRowInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.01],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const colorRowStyles = {
    opacity: colorRowInterpolate,
  };

  const scaleYInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const positionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  const rowStyle = {
    transform: [
      { scaleX: scaleYInterpolate },
      { translateY: positionInterpolate },
      { scaleY: animation },
    ],
  };

  const moveInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0],
  });

  const buttonStyle = {
    transform: [{ translateX: moveInterpolate }, { scale: buttonAnimation }],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[rowStyle, styles.rowWrap]}>
        <TouchableWithoutFeedback onPress={toggleInput}>
          <Animated.View style={[styles.colorBall, colorStyle]} />
        </TouchableWithoutFeedback>

        <View style={styles.row}>
          <TouchableOpacity>
            <AnimatedIcon
              name="bold"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="italic"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="align-center"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="link"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.colorRowWrap,
              colorRowStyles,
            ]}
            pointerEvents={inputOpen ? "auto" : "none"}
          >
            <AnimatedTextInput
              value={color}
              style={[styles.input, inputStyle]}
              onChangeText={(e) => setColor(e)}
              ref={inputRef}
            />
            <TouchableWithoutFeedback onPress={toggleInput}>
              <Animated.View style={[styles.okayButton, buttonStyle]}>
                <Text style={styles.okayText}>OK</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </Animated.View>

      <TouchableOpacity onPress={handleToggle} style={styles.button}>
        <Text>Toggle Open/Closed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
  },

  colorRowWrap: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
  },
  input: {
    flex: 5,
  },
  okayButton: {
    borderRadius: 15,
    flex: 1,
    backgroundColor: "#309EEB",
    alignItems: "center",
    justifyContent: "center",
  },
  okayText: {
    color: "#FFF",
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  button: {
    marginTop: 50,
  },
});

export default ToggleEditor;
