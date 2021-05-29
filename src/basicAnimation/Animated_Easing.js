import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';

const MainScreen = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 2000,
      useNativeDriver: true,
      // easing: Easing.back(5),
      // easing: Easing.bounce,
      easing: Easing.elastic(5),
    }).start(() =>
      Animated.timing(animation, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(),
    );
  };

  const animationStyle = {
    transform: [{translateY: animation}],
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
  },
});

export default MainScreen;