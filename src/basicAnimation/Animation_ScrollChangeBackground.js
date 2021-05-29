import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

const MainScreen = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const colorInterpolate = animation.interpolate({
    inputRange: [1, 3000],
    outputRange: ['#6bc963', '#4c46c7'],
  });

  const animationStyle = {
    backgroundColor: colorInterpolate,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={[styles.container, animationStyle]}>
        <View style={styles.contentView} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3068c9',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
  },
  contentView: {
    width: '100%',
    height: 3000,
  },
});

export default MainScreen;