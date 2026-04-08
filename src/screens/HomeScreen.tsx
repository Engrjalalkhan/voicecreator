import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  Animated,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const featureIconSources = {
  settings: require('../assets/images/setting.png'),
  archive: require('../assets/images/archive.png'),
  check: require('../assets/images/tik mark.png'),
  bell: require('../assets/images/bell.png'),
} as const;

const bottomTabIconSources = {
  home: require('../assets/images/splash logo.png'),
  documents: require('../assets/images/document.png'),
  notifications: require('../assets/images/bell.png'),
  settings: require('../assets/images/setting.png'),
} as const;

const featureCardWidth = (width - 50) / 2;
const featureIconBoxSize = Math.min(44, Math.max(34, Math.round(featureCardWidth * 0.26)));
const featureIconBoxPadding = Math.round(featureIconBoxSize * 0.18);
const bottomTabIconSize = Math.min(60, Math.max(45, Math.round(width * 0.14)));

const HomeScreen = ({ userName }: { userName?: string }) => {
  const { width, height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const isSmallScreen = width < 360;
  const isMediumScreen = width >= 360 && width < 400;
  const isLargeScreen = width >= 400;
  
  // Dynamic sizing based on screen width
  const dynamicSizes = {
    headerFontSize: isSmallScreen ? 20 : isMediumScreen ? 22 : 24,
    welcomeFontSize: isSmallScreen ? 28 : isMediumScreen ? 30 : 32,
    buttonFontSize: isSmallScreen ? 14 : 16,
    cardTitleFontSize: isSmallScreen ? 18 : 20,
    featureCardPadding: isSmallScreen ? 12 : 16,
    bottomNavPadding: Platform.OS === 'ios' ? insets.bottom + 8 : 8,
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showVoiceCommands, setShowVoiceCommands] = useState(false);
  const [users, setUsers] = useState<Array<{ initial: string; color: string; image: string | null }>>([
    { initial: 'JD', color: '#4CAF50', image: null },
    { initial: 'AS', color: '#FF9800', image: null },
    { initial: 'MK', color: '#2196F3', image: null },
  ]);

  const getUserInitial = () => {
    if (!userName) return 'U';
    return userName.charAt(0).toUpperCase();
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleVoiceCommands = () => {
    setShowVoiceCommands(!showVoiceCommands);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // In a real app, this would handle actual login logic
    // For demo: show first user as logged in
    setUsers(prevUsers =>
      prevUsers.map((user, index) => ({
        ...user,
        image: index === 0 ? 'https://dummyuser.vercel.app/users/jd.jpg' : user.image
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % dailyNotesData.length);
    }, 3000); // Auto-switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch user profile images from API
    fetch('https://dummyuser.vercel.app/users')
      .then(response => response.json())
      .then(data => {
        const updatedUsers = users.map((user, index) => ({
          ...user,
          image: data[index]?.profileImage || null,
        }));
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error fetching user images:', error));
  }, []);

  const dailyNotesData = [
    { title: 'Your Daily Notes', description: 'Track your voice notes easily', progress: 85 },
    { title: 'Weekly Progress', description: 'Monitor your weekly achievements', progress: 72 },
    { title: 'Monthly Goals', description: 'Set and track monthly objectives', progress: 90 },
  ];

  const features = [
    { id: 1, icon: 'cog', small: '3 New', big: 'Voice', progress: '2/5', color: '#66BB6A' },
    { id: 2, icon: 'moon-waning-crescent', small: '1 New', big: 'Dark Mode', progress: '1/3', color: '#FF7043' },
    { id: 3, icon: 'microphone', small: '4 New', big: 'Voice', progress: '3/10', color: '#29B6F6' },
    { id: 4, icon: 'star', small: '2 New Alerts', big: 'Important', progress: '2/5', color: '#AB47BC' },
  ];

  const renderIcon = (iconName: string, color: string) => {
    return (
      <View style={[styles.featureIconBox, { backgroundColor: color + '20' }]}>
        <Icon 
          name={iconName} 
          size={24} 
          color={color} 
          style={styles.featureIconImage}
        />
      </View>
    );
  };

  const renderVoiceCommandsUI = () => {
    const voiceCommands = [
      { id: 1, command: 'Create Note', description: 'Start a new voice note', icon: 'microphone', color: '#4CAF50' },
      { id: 2, command: 'Save Note', description: 'Save current voice note', icon: 'content-save', color: '#2196F3' },
      { id: 3, command: 'Delete Note', description: 'Delete current note', icon: 'trash-can', color: '#F44336' },
      { id: 4, command: 'Share Note', description: 'Share note with others', icon: 'share', color: '#FF9800' },
      { id: 5, command: 'Search Notes', description: 'Find notes by voice', icon: 'magnify', color: '#9C27B0' },
      { id: 6, command: 'Settings', description: 'Open voice settings', icon: 'cog', color: '#607D8B' },
    ];

    return (
      <View style={styles.voiceCommandsContainer}>
        <Text style={[styles.voiceCommandsTitle, { fontSize: dynamicSizes.cardTitleFontSize }]}>Voice Commands</Text>
        <Text style={styles.voiceCommandsSubtitle}>Tap any command to activate</Text>
        
        <View style={styles.voiceCommandsGrid}>
          {voiceCommands.map((cmd) => (
            <TouchableOpacity key={cmd.id} style={styles.voiceCommandCard}>
              <View style={[styles.voiceCommandIcon, { backgroundColor: cmd.color + '20' }]}>
                <Icon name={cmd.icon} size={28} color={cmd.color} />
              </View>
              <Text style={styles.voiceCommandText}>{cmd.command}</Text>
              <Text style={styles.voiceCommandDescription}>{cmd.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.backButton} onPress={handleVoiceCommands}>
          <Icon name="arrow-left" size={20} color="#4CAF50" />
          <Text style={styles.backButtonText}>Back to Features</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { fontSize: dynamicSizes.headerFontSize }]}>Home</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.searchIconContainer} onPress={toggleSearch}>
            <Text style={[styles.searchIconText, { fontSize: isSmallScreen ? 18 : 20 }]}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search anything..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { fontSize: dynamicSizes.welcomeFontSize }]}>Welcome</Text>
          <Text style={[styles.welcomeText, { fontSize: dynamicSizes.welcomeFontSize }]}>VoiceNotes</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.featuresButton, { paddingVertical: isSmallScreen ? 12 : 15 }]}>
            <Text style={[styles.featuresButtonText, { fontSize: dynamicSizes.buttonFontSize }]}>Features</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.voiceCommandsButton, { paddingVertical: isSmallScreen ? 12 : 15 }]} onPress={handleVoiceCommands}>
            <Text style={[styles.voiceCommandsButtonText, { fontSize: dynamicSizes.buttonFontSize }]}>Voice Commands</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Notes Carousel */}
        <View style={styles.dailyNotesCard}>
          <View style={styles.dailyNotesHeader}>
            <View>
              <Text style={[styles.dailyNotesTitle, { fontSize: dynamicSizes.cardTitleFontSize }]}>{dailyNotesData[currentCardIndex].title}</Text>
              <Text style={[styles.dailyNotesDescription, { fontSize: isSmallScreen ? 12 : 14 }]}>{dailyNotesData[currentCardIndex].description}</Text>
            </View>
            <View style={styles.cardUsersContainer}>
              {users.slice(0, 2).map((u, idx) => (
                <View
                  key={`daily-u-${idx}`}
                  style={[styles.cardAvatarCircle, { marginLeft: idx === 0 ? 0 : -8 }]}
                >
                  {u.image ? (
                    <Image source={{ uri: u.image }} style={styles.cardAvatarImage} />
                  ) : (
                    <View style={styles.cardAvatarFallback} />
                  )}
                </View>
              ))}
            </View>
          </View>
          <Text style={[styles.dailyNotesProgressText, { fontSize: isSmallScreen ? 20 : 24 }]}>{dailyNotesData[currentCardIndex].progress}%</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${dailyNotesData[currentCardIndex].progress}%` }]} />
          </View>
        </View>
        
        {/* Carousel Dots */}
        <View style={styles.carouselDotsContainer}>
          {dailyNotesData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.carouselDot,
                index === currentCardIndex && styles.carouselDotActive
              ]}
            />
          ))}
        </View>

        {/* Features Section or Voice Commands */}
        {showVoiceCommands ? (
          renderVoiceCommandsUI()
        ) : (
          <>
            <Text style={[styles.featuresText, { fontSize: dynamicSizes.cardTitleFontSize }]}>Features</Text>

            {/* Features Grid */}
            <View style={styles.featuresGrid}>
              {features.map((feature) => {
                const current = parseInt(feature.progress.split('/')[0], 10);
                const total = parseInt(feature.progress.split('/')[1], 10);
                const pct = total > 0 ? (current / total) * 100 : 0;

                return (
                  <View key={feature.id} style={[styles.featureCard, { padding: dynamicSizes.featureCardPadding }]}>
                    <View style={styles.featureCardTopRow}>
                      {renderIcon(feature.icon, feature.color)}

                      <View style={styles.featureAvatars}>
                        {users.slice(0, 2).map((u, idx) => (
                          <View
                            key={`${feature.id}-u-${idx}`}
                            style={[styles.featureAvatarCircle, { marginLeft: idx === 0 ? 0 : -8 }]}
                          >
                            {u.image ? (
                              <Image source={{ uri: u.image }} style={styles.featureAvatarImage} />
                            ) : (
                              <View style={styles.featureAvatarFallback} />
                            )}
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.featureTextBlock}>
                      <Text style={[styles.featureMetaSmall, { fontSize: isSmallScreen ? 14 : 16 }]}>{feature.small}</Text>
                      <Text style={[styles.featureMetaBig, { fontSize: isSmallScreen ? 22 : 26 }]}>{feature.big}</Text>
                    </View>

                    <View style={styles.featureBottomRow}>
                      <View style={styles.featureProgressBarBg}>
                        <View style={[styles.featureProgressBarFill, { width: `${pct}%` }]} />
                      </View>

                      <View style={[styles.featureProgressPill, { minWidth: isSmallScreen ? 45 : 52 }]}>
                        <Text style={[styles.featureProgressPillText, { fontSize: isSmallScreen ? 12 : 14 }]}>{feature.progress}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#333333',
  },
  featuresText: {
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 6,
    marginBottom: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchIconContainer: {
    padding: 5,
  },
  searchIconText: {
    fontSize: 20,
    color: '#666666',
  },
  searchBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: '#333333',
    padding: 0,
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardUsersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 6,
    right: 12,
  },
  cardAvatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CFCFCF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  cardAvatarImage: {
    width: '100%',
    height: '100%',
  },
  cardAvatarFallback: {
    flex: 1,
    backgroundColor: '#BDBDBD',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#333333',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  featuresButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  featuresButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  voiceCommandsButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  voiceCommandsButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  dailyNotesCard: {
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    padding: 16,
    marginBottom: 25,
  },
  dailyNotesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dailyNotesTitle: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  dailyNotesDescription: {
    color: '#666666',
  },
  peopleIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  dailyNotesProgressText: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  carouselDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 4,
  },
  carouselDotActive: {
    backgroundColor: '#4CAF50',
    transform: [{ scale: 1.2 }],
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  featureCard: {
    width: (width - 50) / 2,
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'stretch',
  },
  featureCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featureIconBox: {
    width: featureIconBoxSize,
    height: featureIconBoxSize,
    borderRadius: Math.round(featureIconBoxSize * 0.32),
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    padding: featureIconBoxPadding,
  },
  featureIconImage: {
    // Vector icons don't need width/height like images
  },
  featureIconShape: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  featureAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureAvatarCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CFCFCF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  featureAvatarImage: {
    width: '100%',
    height: '100%',
  },
  featureAvatarFallback: {
    flex: 1,
    backgroundColor: '#BDBDBD',
  },
  featureTextBlock: {
    marginTop: 14,
  },
  featureMetaSmall: {
    color: '#333333',
    fontWeight: '500',
  },
  featureMetaBig: {
    marginTop: 2,
    color: '#333333',
    fontWeight: '800',
  },
  featureBottomRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureProgressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  featureProgressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  featureProgressPill: {
    minWidth: 52,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureProgressPillText: {
    color: '#C8E6C9',
    fontWeight: '700',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  bottomTabIcon: {
    resizeMode: 'contain',
  },
  bottomTabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabEmoji: {
    textAlign: 'center',
    lineHeight: bottomTabIconSize,
  },
  bottomTabIconText: {
    fontSize: Math.max(10, Math.round(bottomTabIconSize * 0.3)),
    color: '#2D2D2D',
    fontWeight: '600',
  },
  // Voice Commands UI Styles
  voiceCommandsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  voiceCommandsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  voiceCommandsSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  voiceCommandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  voiceCommandCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voiceCommandIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  voiceCommandText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  voiceCommandDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen;
