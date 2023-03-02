import React, { useRef, useState } from "react";
import { Animated, Pressable, TouchableOpacity, View } from "react-native";
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
  const Y_POSITION = useRef(new Animated.Value(0)).current;
  const [up, setUp] = useState(false);

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration: 500,
    }).start(toggleUp);
  };

  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
  });

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  // Y.addListener(() => console.log(Y));
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <Box
          style={{
            opacity,
            borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
