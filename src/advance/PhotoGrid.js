import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { set } from "react-native-reanimated";

const images = [
  { uri: "http://i.imgur.com/ELeNsEk.jpg" },
  { uri: "http://i.imgur.com/nRzunT5.jpg" },
  { uri: "http://i.imgur.com/mLsfCaX.jpg" },
  { uri: "http://i.imgur.com/LWNij55.jpg" },
  { uri: "http://i.imgur.com/Qp3EbEL.jpg" },
  { uri: "http://i.imgur.com/fHspYxM.jpg" },
  { uri: "http://i.imgur.com/iJNUXyy.jpg" },
  { uri: "http://i.imgur.com/9Nq6ecH.jpg" },
  { uri: "http://i.imgur.com/dWjRmlv.jpg" },
  { uri: "http://i.imgur.com/wJ6GfX2.jpg" },
  { uri: "http://i.imgur.com/kyprcIX.jpg" },
  { uri: "http://i.imgur.com/B5gbx7T.jpg" },
  { uri: "http://i.imgur.com/aEwp6No.jpg" },
  { uri: "http://i.imgur.com/Ophf7gS.jpg" },
  { uri: "http://i.imgur.com/fbj7fPr.jpg" },
  { uri: "http://i.imgur.com/KP7sqd3.jpg" },
  { uri: "http://i.imgur.com/LBKLcn8.jpg" },
];

const PhtoGrid = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.ValueXY()).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const headerHeight = useHeaderHeight();
  const [activeImage, setActiveImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [originPosition, setOriginPosition] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const _gridImages = useRef(new Array(images.length).fill(null));
  const viewImageRef = useRef(null);

  useEffect(() => {
    if (activeIndex !== null) {
      viewImageRef.current.measure(
        (tX, tY, tWidth, tHeight, tPageX, tPageY) => {
          Animated.parallel([
            Animated.spring(position.x, {
              toValue: tX,
              useNativeDriver: false,
            }),
            Animated.spring(position.y, {
              toValue: tY,
              useNativeDriver: false,
            }),
            Animated.spring(size.x, {
              toValue: tWidth,
              useNativeDriver: false,
            }),
            Animated.spring(size.y, {
              toValue: tHeight,
              useNativeDriver: false,
            }),
            Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        }
      );
    }
  }, [activeIndex]);

  const handleOpenImage = (index) => {
    _gridImages.current[index].measure((x, y, width, height, pageX, pageY) => {
      opacityAnimation.setValue(1);

      position.setValue({
        x: pageX,
        y: pageY,
      });

      size.setValue({
        x: width,
        y: height,
      });
      setActiveImage(images[index]);
      setActiveIndex(index);
      setOriginPosition({
        x: pageX,
        y: pageY - headerHeight,
        width,
        height,
      });
    });
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: originPosition.x,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(position.y, {
        toValue: originPosition.y,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.x, {
        toValue: originPosition.width,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.y, {
        toValue: originPosition.height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setActiveIndex(null);
      opacityAnimation.setValue(0);
    });
  };

  const animatedContentTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const animtedContentStyles = {
    opacity: animation,
    transform: [
      {
        translateY: animatedContentTranslate,
      },
    ],
  };

  const animatedClose = {
    opacity: animation,
  };

  const activeImageStyle = {
    width: size.x,
    height: size.y,
    top: position.y,
    left: position.x,
    opacity: opacityAnimation,
  };

  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {images.map((src, index) => {
            const style = index === activeIndex ? activeIndexStyle : undefined;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleOpenImage(index)}
                style={styles.imageContainer}
                onLayout={(e) =>
                  (_gridImages.current[index]["positionE"] = e.nativeEvent)
                }
              >
                <Animated.Image
                  source={src}
                  style={[styles.gridImage, style]}
                  resizeMode="cover"
                  ref={(el) => (_gridImages.current[index] = el)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={activeIndex ? "auto" : "none"}
      >
        <View style={styles.topContent} ref={viewImageRef}>
          <Animated.Image
            key={activeIndex}
            source={activeImage}
            resizeMode="cover"
            style={[styles.viewImage, activeImageStyle]}
          />
        </View>
        <Animated.View style={[styles.content, animtedContentStyles]}>
          <Text style={styles.title}>Pretty Image from Unsplash</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis interdum porttitor. Nam lorem justo, aliquam id feugiat
            quis, malesuada sit amet massa. Sed fringilla lorem sit amet metus
            convallis, et vulputate mauris convallis. Donec venenatis tincidunt
            elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
            lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra
            tellus, et venenatis massa. Maecenas ac gravida purus, in porttitor
            nulla. Integer vitae dui tincidunt, blandit felis eu, fermentum
            lorem. Mauris condimentum, lorem id convallis fringilla, purus orci
            viverra metus, eget finibus neque turpis sed turpis.
          </Text>
        </Animated.View>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.close, animatedClose]}>
            <Text style={styles.closeText}>X</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "33%",
    height: 150,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  viewImage: {
    width: null,
    height: null,
    position: "absolute",
    top: 0,
    left: 0,
  },
  topContent: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    backgroundColor: "transparent",
    fontSize: 28,
    color: "#FFF",
  },
});

export default PhtoGrid;
