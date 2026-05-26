import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoRef = useRef(null);

  useEffect(() => {
    const runAnimation = async () => {
      await logoRef.current.bounceInDown(1000);
      await logoRef.current.shake(600);

      // Manually animate scale up for blast effect
      await logoRef.current.animate(
        {
          0: { scale: 1, opacity: 1 },
          1: { scale: 6, opacity: 0 },
        },
        800
      );

      navigation.replace('LoginPage');
    };

    runAnimation();
  }, []);

  return (
    <LinearGradient colors={['#3A86FF', '#06D6A0']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3A86FF" />

      <Animatable.Image
        ref={logoRef}
        source={require('../Screen/images/logo.png')}
        style={styles.logo}
        resizeMode="cover"
      />

      {/* <Animatable.Text animation="fadeInUp" delay={2000} style={styles.appName}>
        PocketFix
      </Animatable.Text> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
