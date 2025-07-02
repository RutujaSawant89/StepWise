import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Svg, { Circle } from 'react-native-svg';

/* import { LottieView } from 'lottie-react-native'; */

const CALORIES_PER_STEP = 0.04; // Average calories burned per step




export default function Steps() {
  const [steps, setSteps] = useState(0);
  const [iscounting, setIsCounting] = useState(false);
  const [lastZ, setLastZ] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);

  const animationRefRunning = useRef(null);
  const animationRefsitting = useRef(null);

  useEffect(() => {
    let subscription;

    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener(({ z }) => {
          const currentTime = new Date().getTime();
          const threshold = 0.18;

          if (
            Math.abs(z - lastZ) > threshold &&
            !iscounting &&
            (currentTime - lastTimestamp > 800)
          ) {
            setIsCounting(true);
            setLastZ(z);
            setLastTimestamp(currentTime);
            setSteps((prevSteps) => prevSteps + 1);

            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        });
      }else {
        console.log('Accelerometer is not available on this device.');
      }
    });

    

    return () => {
      if (subscription) subscription.remove();
    };
  }, [lastZ, lastTimestamp, iscounting]);

  

const resetSteps = () => {
    setSteps(0);
  };
const estimatedCalories = steps * CALORIES_PER_STEP;
const STEP_GOAL = 1000; // example target
const progress = Math.min(steps / STEP_GOAL, 1); 
  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>StepWise</Text>

    <View style={styles.circleContainer}>
  <Svg height="200" width="200">
    <Circle
      cx="100"
      cy="100"
      r="90"
      stroke="#ffffff30"
      strokeWidth="12"
      fill="none"
    />
    <Circle
      cx="100"
      cy="100"
      r="90"
      stroke="#ffffff"
      strokeWidth="10"
      strokeDasharray={2 * Math.PI * 90}
      strokeDashoffset={(1 - progress) * 2 * Math.PI * 90}
      strokeLinecap="round"
      fill="none"
      rotation="-90"
      origin="100,100"
    />
  </Svg>

  <View style={styles.circleContent}>
    <Text style={styles.circleSteps}>{steps}</Text>
    <Text style={styles.circleLabel}>Steps</Text>
  </View>
</View>

    {/* Calories Box */}
    <View style={styles.caloriesContainer}>
      <Text style={styles.caloriesText}>Estimated Calories Burned</Text>
      <Text style={styles.caloriesNumber}>
        {estimatedCalories.toFixed(2)} cal 🔥
      </Text>

      <TouchableOpacity onPress={resetSteps} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Steps</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a40',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
  fontSize: 34,
  fontFamily: 'Quicksand_700Bold',
  color: '#FF6B6B', // Coral
  marginBottom: 40,
},
  circleContainer: {
  width: 200,
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 40,
},
circleContent: {
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
},
circleSteps: {
  fontSize: 44,
  color: '#00E6A1', // Mint green
  fontFamily: 'Quicksand_700Bold',
},
circleLabel: {
  fontSize: 16,
  color: '#cccccc',
  fontFamily: 'Quicksand_400Regular',
  marginTop: 6,
},

  caloriesContainer: {
  backgroundColor: '#29295e',
  borderRadius: 20,
  padding: 20,
  width: '90%',
  alignItems: 'center',
  shadowColor: '#fff',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 6,
  borderColor: '#6C63FF',
  borderWidth: 1,
},
caloriesNumber: {
  fontSize: 24,
  color: '#4ECDC4', // Mint blue
  fontFamily: 'Quicksand_700Bold',
  marginBottom: 15,
},
  caloriesText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Quicksand_400Regular',
    marginBottom: 10,
  },
 
  resetButton: {
  marginTop: 10,
  backgroundColor: '#FFA726', // Orange
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 30,
},
resetButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontFamily: 'Quicksand_700Bold',
},
});
