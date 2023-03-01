import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
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
  const Y = new Animated.Value(0);
  const moveUp = () => {
    Animated.spring(Y, {
      toValue: 200,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  };
  Y.addListener(() => console.log(Y));
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <Box
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
