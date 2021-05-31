import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
} from "react-native";

const url =
  "https://thegioidienanh.vn/stores/news_dataimages/anhvu/092019/07/10/in_article/0741_01.jpg";
const StaggeredHead = () => {
  const imgArr = [
    {
      id: 1,
      url: "https://vtv1.mediacdn.vn/thumb_w/650/2019/9/17/photo-1-1568705936818396726721.jpeg",
      animation: new Animated.ValueXY(),
    },
    {
      id: 2,
      url,
      animation: new Animated.ValueXY(),
    },
    {
      id: 3,
      url,
      animation: new Animated.ValueXY(),
    },
    {
      id: 4,
      url,
      animation: new Animated.ValueXY(),
    },
  ];

  let x = 0;
  let y = 0;
  useEffect(() => {
    imgArr[0].animation.addListener((value) => {
      x = value.x;
      y = value.y;
    });
  }, []);

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      imgArr.map(({ animation }) => {
        animation.extractOffset();
      });
    },
    onPanResponderMove: (e, { dx, dy }) => {
      let listAnimation = [];
      imgArr.map(({ animation }, i) => {
        listAnimation.push(Animated.delay(i * 20));
        listAnimation.push(
          Animated.timing(animation, {
            toValue: { x: dx, y: dy },
            useNativeDriver: true,
            duration: 0,
          })
        );
      });

      Animated.sequence(listAnimation).start();
    },
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {imgArr
        .slice(0)
        .reverse()
        .map((e, index, items) => {
          const pan = e.id === 1 ? _panResponder.panHandlers : {};
          return (
            <Animated.View
              style={[
                styles.avatarStyle,
                { transform: e.animation.getTranslateTransform() },
              ]}
              key={e.id}
              {...pan}
            >
              <Image source={{ uri: e.url }} style={styles.avatarContainer} />
            </Animated.View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StaggeredHead;