import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

const BasicAnimated = ({ scaleNumber = 2, typeScale = "scale" }) => {
  const [animation, setAnimation] = useState(new Animated.Value(1));
  const [isTranslateY, setTranslateY] = useState(true);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: scaleNumber,
      duration: 1000,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    );
    setTranslateY(!isTranslateY);
  };

  const setTypeScale = (type) => {
    switch (typeScale) {
      case "x":
        return {
          transform: [
            {
              scaleX: animation,
            },
          ],
        };
      case "y":
        return {
          transform: [
            {
              scaleY: animation,
            },
          ],
        };
      default: {
        return {
          transform: [
            {
              scale: animation,
            },
          ],
        };
      }
    }
  };
  const animationStyle = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => startAnimation()}>
        <Animated.View style={[styles.box, setTypeScale()]}>
          <Text>Hello World</Text>
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
    backgroundColor: "orange",
  },
});

export default BasicAnimated;
