import React, {useEffect, useMemo, useRef} from 'react';
import {Circle, G, Line, Path} from 'react-native-svg';
import {Animated} from 'react-native';
import {
  SCALE_MARGIN,
  STROKE_WIDTH,
  SCALE_LONG_WIDTH,
} from '@components/wave/const/defaultconst';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function WaveView(props) {
  const {x, y, radius, progress, total} = props;
  const height = radius * 2;

  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationParams = {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    };

    const fadeInAnimation = Animated.timing(waveAnim, {
      ...animationParams,
      toValue: 1,
    });

    const fadeOutAnimation = Animated.timing(waveAnim, {
      ...animationParams,
      toValue: 0,
    });

    const sequenceAnimation = Animated.sequence([
      fadeInAnimation,
      fadeOutAnimation,
    ]);

    const loopedAnimation = Animated.loop(sequenceAnimation);

    loopedAnimation.start();

    return () => {
      loopedAnimation.stop(); // 清除动画
    };
  }, [waveAnim]);

  /*const wavePath = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'M27 150 C150,200 150,100 273,150 A90,90 0 0,1 27,150 Z',
      'M27 150 C100,100 150,200 273,150 A90,90 0 0,1 27,150 Z',
    ],
  });*/

  const sHeight = useMemo(
    () => radius - (height * progress) / 100,
    [radius, height, progress],
  );

  const cx = useMemo(
    () => Math.sqrt(Math.pow(radius, 2) - Math.pow(sHeight, 2)),
    [radius, sHeight],
  );

  function drawWave() {
    console.log('================================');
    console.log(`sHeight: ${sHeight} ss: ${cx}`);
    // console.log(`sAngle: ${sAngle}`);
    // console.log(`startX: ${startX}  startY: ${startY}`);
    console.log('================================');

    const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH;

    const wavePath = waveAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        `M${sRadius - cx} ${sRadius + sHeight} C${sRadius - cx},200 ${
          sRadius - cx
        },100 273,${sRadius - cx} A90,90 0 0,1 ${sRadius - cx},${
          sRadius + sHeight
        } Z`,
        'M27 150 C100,100 150,200 273,150 A90,90 0 0,1 27,150 Z',
      ],
    });

    const x1 = sRadius - cx;
    const y1 = sRadius + sHeight;

    const x2 = sRadius + cx;

    return (
      <G>
        <Circle cx={x} cy={y} r={radius} fill={'pink'} />
        <AnimatedPath
          d={`M${x1} ${y1} C${x1},200 150,100 ${x2},${y1} A10,10 0 0,1 ${x1},${y1} Z`}
          fill="rgba(135,206,250,.4)"
        />
      </G>
    );
  }

  return drawWave();
}

export default React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({}));

  return <WaveView {...props} />;
});
