import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFont from 'react-native-global-font';

const { width, height } = Dimensions.get('window');

export default function LoginPage({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shake] = useState(new Animated.Value(0));

  useEffect(() => {
    GlobalFont.applyGlobal('Poppins-Medium');

    const shakeAnimation = () => {
      return Animated.sequence([
        Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.delay(10000), // 4 sec gap
      ]);
    };

    const shakeLoop = Animated.loop(shakeAnimation(), { resetBeforeIteration: true });
    shakeLoop.start();

    return () => shakeLoop.stop();
  }, [shake]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Solid fallback background in case gradient fails */}
      <View style={styles.fallbackBackground} />

      {/* Background Gradient */}
      <LinearGradient colors={['#3A86FF', '#06D6A0']} style={StyleSheet.absoluteFillObject} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#3A86FF" />

        <Animated.View style={{ transform: [{ translateX: shake }], position: 'absolute', top: height * 0.15}}>
          <Image
            source={require('../Screen/images/logo.png')}
            style={{
              width: width * 0.4,
              height: width * 0.4,
              borderRadius: width * 0.2,
              marginBottom: 20,
            }}
          />
        </Animated.View>

        <Animatable.View
          animation="fadeInLeft"
          delay={700}
          style={{
            position: 'absolute',
            top: height * 0.36,
            left: width * 0.08,
            zIndex: 2,
          }}
        >
          <Text style={styles.welcomeText}>Stay tuned with PocketFix</Text>
        </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1200} style={styles.card}>
            <Text style={{color:'#5c5c5c',fontFamily:'monospace',fontSize:width*0.05,fontWeight:'bold',paddingBottom:width*0.02}}>Login</Text>
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Image source={require('../Screen/images/call.png')} style={{ width: width * 0.06, height: width * 0.06, marginHorizontal:width*0.03}} />
                <Text style={{ fontSize: width*0.042, color: '#888'}}>+91</Text>
                <TextInput
                  placeholder="70xx-xxx-878"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text.trim())}
                  keyboardType="phone-pad"
                  maxLength={10}
                  selectionColor="black"
                  returnKeyType='done'
                />
              </View>

            {/* Send OTP Button */}
            <Animated.View style={{ transform: [{ translateX: shake }], width: '100%' }}>
              <TouchableOpacity onPress={()=>navigation.navigate('SelectAccount')} style={styles.sendOtpButton}>
                <Text style={styles.sendOtpText}>Send OTP</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* OR */}
            <Text style={styles.orText}>or</Text>

            {/* Google Button */}
            <Animated.View style={{ transform: [{ translateX: shake }], width: '100%' }}>
              <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleText}>Login with</Text>
                <Image
                  source={require('../Screen/images/google.png')}
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginLeft: width * 0.02,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06D6A0', // Fallback color
  },
  fallbackBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#06D6A0',
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: width*0.055,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow direction and distance
    textShadowRadius: 4,
  },
  
  card: {
    position: 'absolute',
    top: height * 0.5,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingVertical: width*0.03,
    paddingHorizontal: width*0.04,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 100,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0.3,
  },
  input: {
    fontSize: 16,
    color: '#333',flex:1,letterSpacing:2
  },
  sendOtpButton: {
    backgroundColor: '#06D6A0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  sendOtpText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginVertical: width * 0.02,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 10,
    width: '100%',
  },
  googleText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});
