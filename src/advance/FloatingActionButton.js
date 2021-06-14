import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const FloatingActionButton = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOpen(!isOpen));
  };

  const bgInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const bgStyle = {
    transform: [{ scale: bgInterpolate }],
  };

  const btnOrderInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });

  const btnOrderStyle = {
    transform: [{ translateY: btnOrderInterpolate }],
  };

  const btnReloadInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  const btnReloadStyle = {
    transform: [{ translateY: btnReloadInterpolate }],
  };

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1],
  });

  const textTranslateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });
  const textAnimationStyle = {
    opacity: opacityInterpolate,
    transform: [{ translateX: textTranslateInterpolate }],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, bgStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, btnOrderStyle]}>
          <Animated.Text style={[styles.label, textAnimationStyle]}>
            Order
          </Animated.Text>
          <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, btnReloadStyle]}>
          <Animated.Text style={[styles.label, textAnimationStyle]}>
            Reload
          </Animated.Text>
          <Icon name="reload" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Animated.Text style={[styles.label, textAnimationStyle]}>
            Pay
          </Animated.Text>
          <Text style={styles.payText}>$5.00</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: "rgba(0,0,0,.2)",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  other: {
    backgroundColor: "#FFF",
  },
  payText: {
    color: "#FFF",
  },
  pay: {
    backgroundColor: "#00B15E",
  },
  label: {
    color: "#FFF",
    position: "absolute",
    fontSize: 18,
    backgroundColor: "transparent",
    width: 80,
    textAlign: "right",
  },
});

export default FloatingActionButton;
