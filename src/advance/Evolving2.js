import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
    open: false,
  };

  toggleTransform = () => {
    const toValue = this._open ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 550,
      useNativeDriver: false,
    }).start(() => {
        this._open ? this._input.blur() : this._input.focus();
        this._open = !this._open;
        this.setState({
          open: this._open,
        });
    });
  };

  render() {
    const { width } = Dimensions.get("window");

    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [100, width - 40],
      extrapolate: "clamp",
    });

    const opacityToolbarInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const toolbarStyles = {
      opacity: opacityToolbarInterpolate,
    };

    const editorHeightInputInterpolate = this.state.animation.interpolate({
      inputRange: [0.7, 1],
      outputRange: [0, 150],
      extrapolate: "clamp",
    });

    const editorStyle = {
      opacity: this.state.animation,
      height: editorHeightInputInterpolate,
    };

    const opacityButtonInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const buttonStyles = {
      opacity: opacityButtonInterpolate,
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
          <Animated.View style={styles.bar}>
            <Animated.View style={[styles.toolbar, toolbarStyles]}>
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
              style={[StyleSheet.absoluteFill, styles.center, buttonStyles]}
              pointerEvents={this.state.open ? "none" : "auto"}
            >
              <TouchableWithoutFeedback onPress={this.toggleTransform}>
                <View>
                  <Text style={styles.buttonText}>Write</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.lowerView, editorStyle]}>
            <TextInput
              placeholder="Start writing..."
              style={[StyleSheet.absoluteFill, styles.input]}
              multiline
              ref={(input) => (this._input = input)}
            />
          </Animated.View>
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.toggleTransform}>
          <Animated.View style={toolbarStyles}>
            <Text style={styles.close}>Close</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

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
    // fontSize: 28
  },
  editor: {
    borderWidth: 1,
    borderColor: "rgba(0,0, 0, .1)",
    // shadowColor: "#000",
    // shadowOpacity: .05,
    // shadowRadius: 3,
    // shadowOffset: { x: 0, y: 3 }
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
  },
});
