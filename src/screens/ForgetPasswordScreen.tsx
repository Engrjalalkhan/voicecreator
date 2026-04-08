import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ForgetPasswordScreen = ({ onResetPassword, onBackToSignIn }: { 
  onResetPassword: () => void;
  onBackToSignIn: () => void;
}) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {/* Forget logo image */}
        <Image 
          source={require('../assets/images/forget logo.png')} 
          style={styles.forgetLogo}
          resizeMode="contain"
        />

        {/* Title and tagline */}
        <Text style={styles.title}>Forget Password?</Text>
        <Text style={styles.tagline}>Enter your email address to reset your password</Text>

        {/* Input field */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999999"
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Reset Password button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={onResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backLink} onPress={onBackToSignIn}>
          <Text style={styles.backText}>Back to <Text style={styles.backBold}>Sign In</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  forgetLogo: {
    width: width * 0.6,
    height: height * 0.25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#666666',
  },
  backBold: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default ForgetPasswordScreen;
