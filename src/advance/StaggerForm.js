import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import styled from "styled-components/native";

const Background = { uri: "http://i.imgur.com/t4DsHs8.jpg" };

const StaggerForm = () => {
  const animation_1 = useRef(new Animated.Value(0)).current;
  const animation_2 = useRef(new Animated.Value(0)).current;
  const animation_3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(animation_1, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animation_2, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animation_3, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={Background}
      >
        <View style={styles.imageBg}>
          <Form>
            <Animated.View style={{ opacity: animation_1 }}>
              <Row>
                <TextInput placeholder="Email" style={styles.input} />
              </Row>
            </Animated.View>
            <Animated.View style={{ opacity: animation_2 }}>
              <Row>
                <TextInput
                  placeholder="PassWord"
                  style={styles.input}
                  secureTextEntry={true}
                />
              </Row>
            </Animated.View>
            <Animated.View style={{ opacity: animation_3 }}>
              <TouchableOpacity style={[styles.btn, { alignSelf: "center" }]}>
                <Text
                  style={{ color: "white", fontSize: 16, alignSelf: "center" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Form>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginHorizontal: 50,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "red",
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginTop: 16,
  },
});

const Form = styled.View`
  padding-vertical: 20px;
  width: 100%;
  background-color: #00000080;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export default StaggerForm;
