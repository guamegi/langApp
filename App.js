import React, { useRef, useState } from "react";
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
  const Y = useRef(new Animated.Value(0)).current;
  const [up, setUp] = useState(false);

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
    }).start(toggleUp);
  };
  // Y.addListener(() => console.log(Y));
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
