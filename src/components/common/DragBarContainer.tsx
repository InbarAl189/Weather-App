import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  children: ReactNode,
  shouldReset: boolean,
  onClose(): void
}

const DragBarContainer = ({ children, shouldReset, onClose }: Props) => {
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (shouldReset) {
      anim.setValue(0);
    }
  }, [shouldReset]);
  
  const panResponder = useRef(PanResponder.create({
    // Ask to be the responder:s
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < 0) {
        return;
      }

      anim.setValue(gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const shouldClose = (gestureState.dy > (SCREEN_HEIGHT * 0.55) || gestureState.vy > 1.5);

      Animated.timing(anim, {
        toValue: shouldClose ? SCREEN_HEIGHT : 0,
        duration: 150,
        useNativeDriver: true
      }).start(() => setTimeout(() => shouldClose && onClose(), 10));
    }
  })).current;
  
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: anim }] }]}>
      <View {...panResponder.panHandlers}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.dragBarContainer}>
            <View style={styles.dragBar} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * 0.05,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  dragBarContainer: {
    width: SCREEN_WIDTH,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dragBar: {
    width: 50,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#fff'
  },
});

export { DragBarContainer };
