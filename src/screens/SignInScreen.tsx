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

const SignInScreen = ({ onSignIn, onSignUp, onForgetPassword }: { 
  onSignIn: (name: string) => void;
  onSignUp: () => void;
  onForgetPassword: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {/* Signin logo image */}
        <Image 
          source={require('../assets/images/signinlogo.png')} 
          style={styles.signinLogo}
          resizeMode="contain"
        />

        {/* Title and tagline */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.tagline}>Sign in to continue to VoiceNotes Creator</Text>

        {/* Input fields */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999999"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999999"
          />
          
          {/* Forget Password link */}
          <TouchableOpacity style={styles.forgetPasswordLink} onPress={onForgetPassword}>
            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign In button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={() => {
          const userName = email.split('@')[0] || 'User';
          onSignIn(userName);
        }}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signUpLink} onPress={onSignUp}>
          <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpBold}>Sign Up</Text></Text>
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
  signinLogo: {
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
  signInButton: {
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
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#666666',
  },
  signUpBold: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  forgetPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  forgetPasswordText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default SignInScreen;
