import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  // const [up, setUp] = useState(false);

  // const toggleUp = () => setUp((prev) => !prev);
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const moveUp = () => {
    // Animated.timing(POSITION, {
    //   toValue: up ? 300 : -300,
    //   useNativeDriver: false,
    //   duration: 500,
    // }).start(toggleUp);
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  // const opacity = POSITION.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0.5, 1],
  // });

  // const rotation = POSITION.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ["-360deg", "360deg"],
  // });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  // Y.addListener(() => console.log(Y));
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <Box
          style={{
            backgroundColor: bgColor,
            borderRadius,
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable>
    </Container>
  );
}
