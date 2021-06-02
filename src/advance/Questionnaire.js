import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";

const questionArrData = [
  "Do you tend to follow directions when given?",
  "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
  "Would you enjoy making sure your customers leave happy?",
  "Are you willing to work nights and weekends (and possibly holidays)?",
];

const { width } = Dimensions.get("window");

const EmptyComponent = ({ reset = () => {} }) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTxt}>
        You have already complete all the question.
      </Text>
      <TouchableOpacity style={styles.rsBtn} onPress={reset}>
        <Text style={{ color: "#ffffff", fontSize: 16 }}>
          Click here to restart
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const Questionnaire2 = () => {
  const [questionArr, setQuestionArr] = useState(questionArrData);
  const [curIndex, setCurIndex] = useState(0);

  const textAnimation = useRef(new Animated.Value(0)).current;

  const translateInterpolate = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const animationStyle = {
    transform: [{ translateX: translateInterpolate }],
  };

  const onReset = () => {
    setCurIndex(0);
    textAnimation.setValue(0);
  };

  const startAnimation = () => {
    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        if (curIndex < questionArr.length) {
          setCurIndex(curIndex + 1);
          textAnimation.setValue(0);
        }
      }, 100);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.absoluteView}>
        {curIndex < questionArr.length ? (
          <>
            <Animated.Text style={[styles.animationText, animationStyle]}>
              {curIndex < questionArr.length ? questionArr[curIndex] : ""}
            </Animated.Text>
            <Animated.Text style={[styles.animationText, animationStyle]}>
              {curIndex + 1 < questionArr.length
                ? questionArr[curIndex + 1]
                : ""}
            </Animated.Text>
          </>
        ) : (
          <EmptyComponent reset={onReset} />
        )}
      </View>
      {curIndex < questionArr.length && (
        <ButtonContainer>
          <TouchableOpacity
            onPress={startAnimation}
            style={[styles.btn, styles.bgNo]}
          >
            <Text>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={startAnimation}
            style={[styles.btn, styles.bgYes]}
          >
            <Text>YES</Text>
          </TouchableOpacity>
        </ButtonContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E22D4B",
  },
  absoluteView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  animationText: {
    width: "100%",
    textAlign: "center",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
  bgNo: {
    backgroundColor: "transparent",
  },
  bgYes: {
    backgroundColor: "rgba(255,255,255,.1)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTxt: {
    fontSize: 18,
    color: "#ffffff",
  },
  rsBtn: {
    paddingHorizontal: 50,
    paddingVertical: 16,
    marginTop: 16,
    backgroundColor: "#4a464d",
    borderRadius: 10,
  },
});

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export default Questionnaire2;