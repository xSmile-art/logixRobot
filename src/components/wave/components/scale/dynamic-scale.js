import React, {forwardRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  SCALE_LONG_WIDTH,
  SCALE_MARGIN,
  SCALE_SHORT_WIDTH,
  STROKE_WIDTH,
} from '@components/wave/const/defaultconst';
import {Path} from 'react-native-svg';

function DynamicScale(props) {
  const {x, y, radius, strokeColor, progress} = props;

  const highlightCount = useMemo(
    () => (progress > 0 && progress < 100 ? progress + 1 : progress),
    [progress],
  );

  function drawScale() {
    const longRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH;
    const shortRadius =
      radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_SHORT_WIDTH;

    const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN;

    const singleAngle = 90 / 25;

    const sAngle = 180;

    const scales = [];

    for (let i = 0; i < highlightCount; i++) {
      const angle = sAngle + singleAngle * i;
      const startRadius = [180, 270, 360, 450].includes(angle)
        ? longRadius
        : shortRadius;
      const strokeWidth = [180, 270, 360, 450].includes(angle) ? 2 : 1.3;

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

export default forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({}));
  return <DynamicScale {...props} />;
});

DynamicScale.propTypes = {
  progress: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
};

/*export default class DynamicScale extends PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    radius: PropTypes.number,
    strokeColor: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  drawScale() {
    const {x, y, radius, strokeColor, progress} = this.props;
    const highlightCount =
      progress > 0 && progress < 100 ? progress + 1 : progress;

    const longRadius = radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_LONG_WIDTH;
    const shortRadius =
      radius + STROKE_WIDTH + SCALE_MARGIN + SCALE_SHORT_WIDTH;

    const sRadius = radius + STROKE_WIDTH + SCALE_MARGIN;

    const singleAngle = 90 / 25;

    const sAngle = 180;

    const scales = [];

    for (let i = 0; i < highlightCount; i++) {
      const angle = sAngle + singleAngle * i;
      const startRadius = [180, 270, 360, 450].includes(angle)
        ? longRadius
        : shortRadius;
      const strokeWidth = [180, 270, 360, 450].includes(angle) ? 2 : 1.3;

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

  render() {
    return this.drawScale();
  }
}*/
