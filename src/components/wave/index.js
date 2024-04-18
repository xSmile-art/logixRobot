import React, {useEffect, useRef} from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import PropTypes from 'prop-types';
import {
  SCALE_LONG_WIDTH,
  SCALE_MARGIN,
  STROKE_BACKGROUND,
  STROKE_FOREGROUND,
  STROKE_WIDTH,
} from './const/defaultconst';
import StaticScale from './components/scale/static-scale';
import DynamicScale from './components/scale/dynamic-scale';
import WaveView from './components/wave';
import {Animated, Easing} from 'react-native';
import {arePropsEqual} from '@utils/index';

const AnimatedScale = Animated.createAnimatedComponent(DynamicScale);
const AnimatedWave = Animated.createAnimatedComponent(WaveView);

function ChargeWave(props) {
  const {width = 0, style = {}, progress = 0, strokeColor = {}} = props;

  const {background = STROKE_BACKGROUND, foreground = STROKE_FOREGROUND} =
    strokeColor;

  const animRef = useRef(new Animated.Value(0)).current;

  const size = width / 2;

  const radius = width / 2 - SCALE_LONG_WIDTH - SCALE_MARGIN - STROKE_WIDTH;

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: progress,
      duration: 1500,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start();
  }, [animRef, progress]);

  return (
    <Svg width={width} height={width} style={[style]}>
      {/*<Defs>
        <LinearGradient id="Gradient01">
          <Stop offset="20%" stopColor="#39F" />
          <Stop offset="90%" stopColor="#F3F" />
        </LinearGradient>
      </Defs>

      <Rect x="10" y="10" width="60" height="10" fill="url(#Gradient01)" />*/}
      <StaticScale x={size} y={size} radius={radius} strokeColor={background} />

      <AnimatedScale
        x={size}
        y={size}
        radius={radius}
        progress={animRef.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
        })}
        strokeColor={foreground}
      />

      <AnimatedWave
        x={size}
        y={size}
        radius={radius}
        total={progress}
        progress={animRef.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
        })}
      />
    </Svg>
  );
}

ChargeWave.propTypes = {
  style: PropTypes.object,
  width: PropTypes.number,
  progress: PropTypes.number,
  strokeColor: PropTypes.shape({
    background: PropTypes.string,
    foreground: PropTypes.string,
  }),
};

export default React.memo(ChargeWave, arePropsEqual);
