import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import Dial from '@components/dial';
import ChargeWave from '@components/wave';

export default function Pages() {
  const [progress, setProgress] = useState(50);

  function changeProgress() {
    setProgress(prevState => prevState + 1);
  }

  return (
    <ScrollView style={styles.wrap}>
      {/*<CircularProgress
        width={150}
        progress={80}
        strokeWidth={{background: 8, foreground: 8}}
        strokeColor={{
          background: '#EAEAEA',
          foreground: ['#DAAB74', '#DAED74'],
        }}
        progressIndicator="circle"
        fill="#FFFFFF">
        <Text style={{fontSize: 28, color: '#1B1B1F', position: 'absolute'}}>
          36<Text style={{color: '#AAAAAA', fontSize: 13}}>/48</Text>
        </Text>
      </CircularProgress>

      <CircularProgress
        width={150}
        progress={80}
        strokeWidth={{background: 8, foreground: 8}}
        strokeColor={{background: '#FFFFFF', foreground: ['orange']}}
        fill="black"
      />
      <CircularProgress
        width={200}
        progress={(270 / 360) * 100}
        progressIndicator="circle"
        strokeColor={{
          background: '#F7F7F9',
          foreground: ['#FF8F2C', '#F84238'],
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.bonusText}>400</Text>
          <Text style={styles.bondusDesc}>累计奖金(元)</Text>
        </View>
      </CircularProgress>
      <CircularProgress
        width={200}
        progress={(270 / 360) * 100}
        backgroundProgress={80}
        progressIndicator="circle"
        strokeWidth={{background: 20, foreground: 10}}
        indicatorRadius={3}
        strokeColor={{
          background: 'skyblue',
          foreground: ['#FFFFFF', '#000000'],
        }}
      />
*/}
      {/*<Dial style={styles.dial} width={300} progress={70} />*/}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
  },
  dial: {
    alignSelf: 'center',
    marginVertical: 15,
  },
});
