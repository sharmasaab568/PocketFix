import React, { useEffect, useState, useRef } from 'react';
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
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFont from 'react-native-global-font';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

export default function LoginPage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [shake] = useState(new Animated.Value(0));
  const timerRef = useRef(null);

  useEffect(() => {
    GlobalFont.applyGlobal('Poppins-Medium');

    const shakeAnimation = () => {
      return Animated.sequence([
        Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.delay(10000),
      ]);
    };

    const shakeLoop = Animated.loop(shakeAnimation(), { resetBeforeIteration: true });
    shakeLoop.start();

    return () => {
      shakeLoop.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shake]);

  // Start resend timer
  const startResendTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setResendTimer(30);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Send OTP
  const sendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    const fullPhoneNumber = '+91' + phoneNumber;

    try {
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setVerificationId(confirmation.verificationId);
      setModalVisible(true);
      startResendTimer();
      Alert.alert('Success', 'OTP sent successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otpCode);
      await auth().signInWithCredential(credential);
      
      // Navigate to SelectAccount after successful verification
      navigation.navigate('SelectAccount');
      setModalVisible(false);
      setOtpCode('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      let errorMessage = 'Invalid OTP. Please try again.';
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid OTP code. Please check and try again.';
      } else if (error.code === 'auth/code-expired') {
        errorMessage = 'OTP has expired. Please request a new one.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    if (resendTimer > 0) {
      Alert.alert('Please wait', `Wait ${resendTimer} seconds before requesting again`);
      return;
    }

    setLoading(true);
    const fullPhoneNumber = '+91' + phoneNumber;

    try {
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setVerificationId(confirmation.verificationId);
      startResendTimer();
      Alert.alert('Success', 'OTP resent successfully!');
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In (placeholder - you'll need to implement actual Google Sign In)
  const handleGoogleSignIn = async () => {
    Alert.alert('Google Sign In', 'Google Sign In will be implemented here');
    // Implement actual Google Sign In here
    // navigation.navigate('SelectAccount');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fallbackBackground} />
      <LinearGradient colors={['#3A86FF', '#06D6A0']} style={StyleSheet.absoluteFillObject} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#3A86FF" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Animated.View style={{ transform: [{ translateX: shake }], position: 'absolute', top: height * 0.15 }}>
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
              <Text style={styles.loginTitle}>Login</Text>
              
              <View style={styles.inputContainer}>
                <Image source={require('../Screen/images/call.png')} style={styles.callIcon} />
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  placeholder="70xx-xxx-878"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
                  keyboardType="phone-pad"
                  maxLength={10}
                  selectionColor="black"
                  returnKeyType="done"
                  editable={!loading}
                />
              </View>

              <Animated.View style={{ transform: [{ translateX: shake }], width: '100%' }}>
                <TouchableOpacity 
                  onPress={sendOTP} 
                  style={[styles.sendOtpButton, loading && styles.disabledButton]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.sendOtpText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <Text style={styles.orText}>or</Text>

              <Animated.View style={{ transform: [{ translateX: shake }], width: '100%' }}>
                <TouchableOpacity 
                  style={styles.googleButton}
                  onPress={handleGoogleSignIn}
                >
                  <Text style={styles.googleText}>Login with</Text>
                  <Image
                    source={require('../Screen/images/google.png')}
                    style={styles.googleIcon}
                  />
                </TouchableOpacity>
              </Animated.View>
            </Animatable.View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* OTP Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setOtpCode('');
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Verify OTP</Text>
                <TouchableOpacity 
                  onPress={() => {
                    setModalVisible(false);
                    setOtpCode('');
                  }}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                Enter the 6-digit OTP sent to {'\n'}
                <Text style={styles.phoneNumberText}>+91 {phoneNumber}</Text>
              </Text>

              <View style={styles.otpContainer}>
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="#aaa"
                  style={styles.otpInput}
                  value={otpCode}
                  onChangeText={(text) => setOtpCode(text.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                  maxLength={6}
                  selectionColor="#3A86FF"
                  returnKeyType="done"
                  editable={!otpLoading}
                  autoFocus={true}
                />
              </View>

              <TouchableOpacity 
                style={[styles.verifyButton, otpLoading && styles.disabledButton]}
                onPress={verifyOTP}
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.verifyButtonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.resendButton, resendTimer > 0 && styles.disabledResendButton]}
                onPress={resendOTP}
                disabled={resendTimer > 0 || loading}
              >
                <Text style={[styles.resendText, resendTimer > 0 && styles.disabledResendText]}>
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06D6A0',
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
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  loginTitle: {
    color: '#5c5c5c',
    fontFamily: 'monospace',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    paddingBottom: width * 0.02,
  },
  card: {
    position: 'absolute',
    top: height * 0.5,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
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
  callIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginHorizontal: width * 0.03,
  },
  countryCode: {
    fontSize: width * 0.042,
    color: '#888',
  },
  input: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    letterSpacing: 2,
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
  googleIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginLeft: width * 0.02,
  },
  disabledButton: {
    opacity: 0.7,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneNumberText: {
    fontWeight: 'bold',
    color: '#3A86FF',
  },
  otpContainer: {
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#333',
  },
  verifyButton: {
    backgroundColor: '#3A86FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    paddingVertical: 10,
  },
  resendText: {
    color: '#3A86FF',
    fontSize: 14,
  },
  disabledResendButton: {
    opacity: 0.5,
  },
  disabledResendText: {
    color: '#999',
  },
});