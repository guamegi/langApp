import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled(Animated.createAnimatedComponent(View))`
  width: 200px;
  height: 200px;
  background-color: tomato;
`;
// const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        // console.log(dx, dy);
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        Animated.spring(POSITION, {
          toValue: {
            x: 0,
            y: 0,
          },
          bounciness: 20,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  return (
    <Container>
      <Box
        {...panResponder.panHandlers}
        style={{
          backgroundColor: bgColor,
          borderRadius,
          transform: [...POSITION.getTranslateTransform()],
        }}
      />
    </Container>
  );
}
