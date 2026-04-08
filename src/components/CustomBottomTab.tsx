import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;
const CURVE_HEIGHT = 20;
const CURVE_WIDTH = 60;

interface Tab {
  name: string;
  label: string;
  icon: string;
}

interface CustomBottomTabProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const CustomBottomTab: React.FC<CustomBottomTabProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const animatedCurvePosition = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.name === activeTab);
    const tabWidth = screenWidth / tabs.length;
    const curveX = activeIndex * tabWidth + tabWidth / 2;

    Animated.spring(animatedCurvePosition, {
      toValue: curveX,
      tension: 60,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabs.length]);

  const createCurvedPath = () => {
    const activeIndex = tabs.findIndex(tab => tab.name === activeTab);
    const tabWidth = screenWidth / tabs.length;
    const curveX = activeIndex * tabWidth + tabWidth / 2;

    // Create the curved path for the selected tab - more rounded curve
    const path = `
      M 0,5
      L ${curveX - 25},5
      Q ${curveX - 20},5 ${curveX - 15},8
      Q ${curveX - 10},12 ${curveX - 5},15
      Q ${curveX},18 ${curveX + 5},15
      Q ${curveX + 10},12 ${curveX + 15},8
      Q ${curveX + 20},5 ${curveX + 25},5
      L ${screenWidth},5
      L ${screenWidth},${TAB_BAR_HEIGHT}
      L 0,${TAB_BAR_HEIGHT}
      Z
    `;

    return path.trim();
  };

  return (
    <View style={styles.container}>
      {/* Green Background */}
      <View style={styles.greenBackground} />
      
      {/* Curved SVG Overlay */}
      <Svg
        width={screenWidth}
        height={TAB_BAR_HEIGHT}
        style={styles.curvedOverlay}
      >
        <Path
          d={createCurvedPath()}
          fill="#2E7D32"
          stroke="transparent"
        />
      </Svg>

      {/* Tab Icons and Labels */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = tab.name === activeTab;
          const tabWidth = screenWidth / tabs.length;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tab,
                { width: tabWidth }
              ]}
              onPress={() => onTabPress(tab.name)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconContainer,
                isActive && styles.activeIconContainer
              ]}>
                <Icon
                  name={tab.icon}
                  size={24}
                  color={isActive ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
              <Text style={[
                styles.label,
                isActive && styles.activeLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
  },
  greenBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    backgroundColor: '#81C784',
  },
  curvedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CustomBottomTab;
