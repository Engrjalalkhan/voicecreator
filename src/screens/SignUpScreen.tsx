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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ onGetStarted, onSignIn }: { 
  onGetStarted: (name: string) => void;
  onSignIn: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [yourName, setYourName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Signup logo image */}
            <Image 
              source={require('../assets/images/signup logo.png')} 
              style={styles.signupLogo}
              resizeMode="contain"
            />

            {/* Title and tagline */}
            <Text style={styles.title}>VoiceNotes Creator</Text>
            <Text style={styles.tagline}>Speak your needs and create apps!</Text>

            {/* Input fields */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999999"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={yourName}
                onChangeText={setYourName}
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={emailAddress}
                onChangeText={setEmailAddress}
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Get Started button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.getStartedButton} onPress={() => onGetStarted(name || yourName)}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.signInLink} onPress={onSignIn}>
              <Text style={styles.signInText}>Already have an account? <Text style={styles.signInBold}>Sign In</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  signupLogo: {
    width: Math.min(width * 0.6, 240),
    height: Math.min(height * 0.2, 160),
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: width > 400 ? 28 : 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: width > 400 ? 16 : 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: width > 400 ? 0 : 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: width > 400 ? 16 : 14,
    marginBottom: 12,
    fontSize: width > 400 ? 16 : 14,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: width > 400 ? 50 : 45,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingTop: 20,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
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
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: width > 400 ? 18 : 16,
    fontWeight: '600',
  },
  signInLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
  },
  signInBold: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default SignUpScreen;
