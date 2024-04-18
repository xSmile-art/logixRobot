import React, {useMemo} from 'react';
import {Circle, Path} from 'react-native-svg';

function WaveView(props) {
  const {x, y, radius, progress, total} = props;

  const sHeight = useMemo(() => {
    return (progress / 100) * (radius * 2);
  }, [radius, progress]);

  const singleAngle = 90 / 25;

  function drawWave() {
    const sAngle = 90 + singleAngle * 3 + sHeight * singleAngle;
    const eAngle = 90 - singleAngle * 3 + sHeight * singleAngle;
    // console.log(`sAngle: ${sAngle} eAngle: ${eAngle}`);
    const startX = x + sHeight * Math.cos((sAngle / 180.0) * Math.PI);
    const startY = y + sHeight * Math.sin((sAngle / 180.0) * Math.PI);

    // const cX = sHeight * Math.cos((270 / 180) * Math.PI);
    // const cY = sHeight * Math.sin((270 / 180) * Math.PI);

    const endX = sHeight * Math.cos((eAngle / 180.0) * Math.PI);
    const endY = sHeight * Math.sin((eAngle / 180.0) * Math.PI);

    console.log('================================');
    console.log(`sHeight: ${sHeight}`);
    console.log(`startX: ${startX}  startY: ${startY}`);
    // console.log(`cX: ${cX}  cY: ${cY}`);
    console.log(`endX: ${endX}  endY: ${endY}`);
    console.log('================================');
    /*d={`M${startX} ${startY - 50} C${startX} 100,200 200, ${endX} ${
      endY - 50
    } H${startX} Z `}*/

    return (
      <>
        <Circle x={x} y={y} r={radius} fill={'pink'} />

        <Path
          d="M28 150
              C40.75 130,95.25 130, 109 150
              S163.5 170,191 150
              S245.5 130,272 150Z"
          stroke={'green'}
          fill="rgba(0, 0, 50, .2)"
          strokeWidth={1}
          strokeLinecap="round"
          // transform={{
          //   rotation: progress,
          // }}
        />
      </>
    );
  }

  return drawWave();
}

export default React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({}));

  return <WaveView {...props} />;
});
