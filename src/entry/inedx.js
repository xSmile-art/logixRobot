import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import Dial from '@components/dial';
import ChargeWave from '@components/wave';
import CircleDivider from '@components/wave/components/AnimatedView';

export default function Pages() {
  const [progress, setProgress] = useState(30);

  function changeProgress() {
    setProgress(prevState => prevState + 1);
  }

  return (
    <ScrollView style={styles.wrap}>
      <Dial
        style={styles.dial}
        width={300}
        progress={progress}
        strokeColor={{
          background: 'rgba(255, 0, 0, 0.3)',
          foreground: 'rgba(255, 0, 0, 0.8)',
        }}
      />

      <Button title={'加1'} onPress={changeProgress} />

      <ChargeWave
        style={styles.dial}
        width={300}
        progress={progress}
        strokeColor={{
          background: 'pink',
          foreground: 'rgba(255, 0, 0, 0.8)',
        }}
      />

      <CircleDivider
        divisions={2}
        radius={123}
        percentage={0}
        fillColor={'pink'}
        strokeColor={'rgba(255, 0, 0, 0.8)'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    // padding: 10,
  },
  dial: {
    alignSelf: 'center',
    marginVertical: 15,
  },
});
