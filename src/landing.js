import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import moment from 'moment'; // install via npm if not already
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';


export default function LandingPage() {
    const navigation = useNavigation();
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
    const animationRef = useRef(null);
    const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>StepWise</Text>
      <Text style={styles.subtext}>Track your steps, stay healthy.</Text>

      <View style={styles.animationContainer}>
        <LottieView
          ref={animationRef}
          source={require('../assets/robot.json')} // Your Lottie walking animation here
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Start Walking</Text>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a40', // dark dreamy night blue
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  time: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 30,
  },
  animationContainer: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 50,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Quicksand_700Bold',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Quicksand_700Bold',
    color: '#fff',
    marginTop: -70,
  },
  subtext: {
    fontSize: 18,
    fontFamily: 'Quicksand_400Regular',
    color: '#fff',
    marginTop: 8,
    marginBottom: 40,

  },
});
