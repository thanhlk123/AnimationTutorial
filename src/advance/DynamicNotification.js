import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";

const DynamicNotification = () => {
  const [notiMessage, setNotiMessage] = useState("");
  const animation = useRef(new Animated.Value(0)).current;

  const onShowNoti = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() =>
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]).start()
    );
  };

  const translateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  let animationStyle = {
    opacity: animation,
    transform: [{ translateY: translateInterpolate }],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.notiContainer, animationStyle]}>
        <Text style={styles.messNoti}>{notiMessage}</Text>
      </Animated.View>
      <View style={styles.absoluteView}>
        <TextInput
          style={styles.input}
          placeholder="Type some things ..."
          onChangeText={(val) => setNotiMessage(val)}
        />
        <TouchableOpacity style={styles.btn} onPress={onShowNoti}>
          <Text style={styles.titleBtn}>Show Noti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  btn: {
    marginTop: 16,
    paddingHorizontal: 50,
    paddingVertical: 16,
    backgroundColor: "red",
    borderRadius: 10,
  },
  titleBtn: {
    color: "white",
    fontSize: 16,
  },
  absoluteView: {
    position: "absolute",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  notiContainer: {
    paddingVertical: 16,
    paddingHorizontal: 100,
    backgroundColor: "orange",
    borderRadius: 10,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 20,
  },
  messNoti: {
    fontSize: 16,
    color: "#ffffff",
    alignSelf: "center",
  },
});

export default DynamicNotification;
