import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const EvolvingWriteBtn = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setOpen] = useState(false);

  const toggleTransform = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setOpen(!isOpen);
    });
  };

  const opacityWriteBtnInterpolate = animation.interpolate({
    inputRange: [0, 0.3],
    outputRange: [1, 0],
  });

  const writeBtn = {
    opacity: opacityWriteBtnInterpolate,
  };

  const widthContainerInterpolate = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0.3 * width, 0.9 * width],
    extrapolate: "clamp",
  });
  const inputHeightInterpolate = animation.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 150],
    extrapolate: "clamp",
  });

  const inputStyle = {
    height: inputHeightInterpolate,
    opacity: animation,
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.center} behavior="padding">
        <Animated.View
          style={[styles.editor, { width: widthContainerInterpolate }]}
        >
          <Animated.View style={styles.bar}>
            <Animated.View style={[styles.toolbar, { opacity: animation }]}>
              <Icon name="format-bold" color="#FFF" size={20} />
              <Icon name="format-italic" color="#FFF" size={20} />
              <Icon name="format-underline" color="#FFF" size={20} />
              <Icon name="format-list-bulleted" color="#FFF" size={20} />
              <View style={styles.rightInnerBar}>
                <Icon name="link" color="#FFF" size={20} />
                <Icon name="image" color="#FFF" size={20} />
                <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
              </View>
            </Animated.View>

            <Animated.View
              style={[StyleSheet.absoluteFill, styles.center, writeBtn]}
                pointerEvents={isOpen ? "none" : "auto"}
            >
              <TouchableWithoutFeedback onPress={toggleTransform}>
                <View>
                  <Text style={styles.buttonText}>Write</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.lowerView, inputStyle]}>
            <TextInput
              placeholder="Start writing..."
              style={[StyleSheet.absoluteFill, styles.input]}
              multiline
            />
          </Animated.View>
        </Animated.View>
        <TouchableWithoutFeedback disabled = {!isOpen} onPress={toggleTransform}>
          <Animated.View style={{ opacity: animation }}>
            <Text style={styles.close}>Close</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
  },
  editor: {
    borderWidth: 1,
    borderColor: "rgba(0,0, 0, .1)",
  },
  bar: {
    backgroundColor: "#2979FF",
    height: 50,
    justifyContent: "center",
  },
  toolbar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  rightInnerBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  lowerView: {
    height: 150,
    overflow: "hidden",
  },
  input: {
    padding: 10,
    fontSize: 20,
  },
  close: {
    color: "#2979FF",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default EvolvingWriteBtn;