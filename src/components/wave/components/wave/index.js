import React, {useMemo} from 'react';
import {Circle, G, Path, Text} from 'react-native-svg';

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
    return (
      <G>
        <Circle cx={x} cy={y} r={radius} fill={'pink'} />
        <Circle cx={x} cy={y} r={radius} fill="none" />
        <G>
          <Path
            d="M28 150 C150,200 150,100 273,150 A90,90 0 0,1 28,150z"
            fill="rgba(135,206,250,.4)"
          />
          <Path
            d="M28,150 C150,100 150,200 273,150 A90,90 0 0,1 28,150z"
            fill="rgba(135,206,250,.3)"
          />
        </G>
      </G>
    );
  }

  return drawWave();
}

export default React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({}));

  return <WaveView {...props} />;
});
