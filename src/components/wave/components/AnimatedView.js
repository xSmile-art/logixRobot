import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Text, Line} from 'react-native-svg';

const CircleWithPointAndIntersection = ({radius, percentage}) => {
  // 计算点到圆底部的高度
  const height = radius - (radius * 2 * percentage) / 100;
  // 计算点在圆上的横向坐标
  const x = Math.sqrt(Math.pow(radius, 2) - Math.pow(height, 2));
  console.log(`height: ${height}  x: ${x}`);

  return (
    <View>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle cx={radius} cy={radius} r={radius} fill="none" stroke="black" />
        <Circle cx={radius} cy={radius + height} r={3} fill="red" />
        <Line
          x1={radius - x}
          y1={radius + height}
          x2={radius + x}
          y2={radius + height}
          stroke="blue"
          strokeWidth="2"
        />
        <Text
          x={radius}
          y={radius + height + 20}
          textAnchor="middle"
          fill="black">
          {height}
        </Text>
      </Svg>
    </View>
  );
};

export default CircleWithPointAndIntersection;
