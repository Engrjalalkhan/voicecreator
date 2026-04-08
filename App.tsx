/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import SplashScreen from './src/screens/SplashScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { StatusBar, StyleSheet, useColorScheme, View, TouchableOpacity, Text, Dimensions, Animated, Platform } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomBottomTab from './src/components/CustomBottomTab';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'signup' | 'signin' | 'forget' | 'home' | 'documents' | 'notifications' | 'settings'>('splash');
  const [userName, setUserName] = useState<string>('');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} userName={userName} setUserName={setUserName} />
    </SafeAreaProvider>
  );
}

function AppContent({ currentScreen, setCurrentScreen, userName, setUserName }: { 
  currentScreen: 'splash' | 'signup' | 'signin' | 'forget' | 'home' | 'documents' | 'notifications' | 'settings';
  setCurrentScreen: (screen: 'splash' | 'signup' | 'signin' | 'forget' | 'home' | 'documents' | 'notifications' | 'settings') => void;
  userName: string;
  setUserName: (name: string) => void;
}) {
  const insets = useSafeAreaInsets();

  // Define tab configuration
  const tabs = [
    { name: 'home', label: 'Home', icon: 'home' },
    { name: 'documents', label: 'Documents', icon: 'file-document' },
    { name: 'notifications', label: 'Notifications', icon: 'bell' },
    { name: 'profile', label: 'Profile', icon: 'account' },
  ];

  const handleCreatePress = () => {
    setCurrentScreen('signup');
  };

  const handleGetStarted = (name: string) => {
    setUserName(name);
    setCurrentScreen('home');
  };

  const handleSignIn = (name: string) => {
    setUserName(name);
    setCurrentScreen('home');
  };

  const handleGoToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleGoToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleForgetPassword = () => {
    setCurrentScreen('forget');
  };

  const handleBackToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleResetPassword = () => {
    console.log('Reset Password pressed');
    // TODO: Handle password reset logic
  };

  const handleTabPress = (tabName: string) => {
    // Map tab names to screen names
    const screenMap: { [key: string]: 'home' | 'documents' | 'notifications' | 'settings' } = {
      'home': 'home',
      'documents': 'documents',
      'notifications': 'notifications',
      'profile': 'settings', // Using settings as profile for now
    };
    
    const targetScreen = screenMap[tabName];
    if (targetScreen) {
      setCurrentScreen(targetScreen);
    }
  };

  // Show auth screens without bottom tabs
  if (currentScreen === 'splash' || currentScreen === 'signup' || currentScreen === 'signin' || currentScreen === 'forget') {
    return (
      <View style={styles.container}>
        {currentScreen === 'splash' ? (
          <SplashScreen onCreatePress={handleCreatePress} />
        ) : currentScreen === 'signup' ? (
          <SignUpScreen onGetStarted={handleGetStarted} onSignIn={handleGoToSignIn} />
        ) : currentScreen === 'signin' ? (
          <SignInScreen onSignIn={handleSignIn} onSignUp={handleGoToSignUp} onForgetPassword={handleForgetPassword} />
        ) : currentScreen === 'forget' ? (
          <ForgetPasswordScreen onResetPassword={handleResetPassword} onBackToSignIn={handleBackToSignIn} />
        ) : null}
      </View>
    );
  }

  // Show main app screens with custom bottom tabs
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {currentScreen === 'home' ? (
          <HomeScreen userName={userName} />
        ) : currentScreen === 'documents' ? (
          <DocumentsScreen />
        ) : currentScreen === 'notifications' ? (
          <NotificationsScreen />
        ) : currentScreen === 'settings' ? (
          <SettingsScreen />
        ) : null}
      </View>
      
      {/* Custom Bottom Tab */}
      <CustomBottomTab
        tabs={tabs}
        activeTab={currentScreen === 'home' ? 'home' : 
                 currentScreen === 'documents' ? 'documents' : 
                 currentScreen === 'notifications' ? 'notifications' : 'profile'}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
  },
});

export default App;
