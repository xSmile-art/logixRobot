import React, {memo} from 'react';
import {
  SCALE_LONG_WIDTH,
  SCALE_MARGIN,
  SCALE_SHORT_WIDTH,
  STROKE_WIDTH,
} from '@components/wave/const/defaultconst';
import {Path} from 'react-native-svg';
import {arePropsEqual} from '@utils/index';
import PropTypes from 'prop-types';

/**
 * 静态刻度线
 * 画刻度线需要有两个虚拟的圆：
 *  * 外面的大圆为刻度外点连成的圆
 *  * 里面的小圆为刻度内点连成的圆
 *
 * 外圆跟圆心连成的线中，外圆与内圆那一段就是刻度线，所以需要计算外圆和内圆上的点并画成线
 * @param props
 * @returns {*[]}
 * @constructor
 */
function StaticScale(props) {
  const {x, y, radius, strokeColor} = props;

  function drawScale() {
    // 长刻度线 外圆半径
    const longRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH;
    // 短刻度线 外圆半径
    const shortRadius =
      radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_SHORT_WIDTH;

    // 内圆半径
    const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN;

    // 刻度线间隔角度
    const singleAngle = 90 / 25;

    // 一圈刻度线数量
    const scale_count = 360 / singleAngle;

    const scales = [];

    for (let i = 0; i < scale_count; i++) {
      const angle = singleAngle * i;

      // 角度为 0、90、180、270 采用长刻度，其余采用短刻度
      const startRadius = [0, 90, 180, 270].includes(angle)
        ? longRadius
        : shortRadius;
      const strokeWidth = [0, 90, 180, 270].includes(angle) ? 2 : 1.3;

      // 根据角度、圆心、半径计算圆上的点
      const bX = x + startRadius * Math.cos((angle / 180.0) * Math.PI);
      const bY = y + startRadius * Math.sin((angle / 180.0) * Math.PI);

      const sX = x + sRadius * Math.cos((angle / 180.0) * Math.PI);
      const sY = y + sRadius * Math.sin((angle / 180.0) * Math.PI);

      scales.push(
        <Path
          key={i}
          d={`M${bX} ${bY} L${sX} ${sY}`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />,
      );
    }
    return scales;
  }

  return drawScale();
}

StaticScale.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
};

export default memo(StaticScale, arePropsEqual);
