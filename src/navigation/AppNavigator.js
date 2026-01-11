import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import PriceOverviewScreen from '../screens/PriceOverviewScreen';
import PriceDetailsScreen from '../screens/PriceDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Price') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={PriceOverviewScreen} />
      <Tab.Screen name="Price" component={PriceOverviewScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isIntroShown = useSelector((state) => state.ui.isIntroShown);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  if (!isReady) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isIntroShown ? (
          <Stack.Screen name="Intro" component={IntroScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="PriceDetails" 
              component={PriceDetailsScreen} 
              options={{ headerShown: true, title: 'Price Details' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}