import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import PriceOverviewScreen from '../screens/PriceOverviewScreen';
import PriceDetailsScreen from '../screens/PriceDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Icon using Emojis (no vector-icons needed)
const TabIcon = ({ focused, routeName }) => {
  const emojis = {
    Home: focused ? '🏠' : '🏠',
    Search: focused ? '🔍' : '🔍',
    Price: focused ? '💰' : '💰',
    Profile: focused ? '👤' : '👤',
  };
  
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>{emojis[routeName]}</Text>
      <Text style={{ 
        fontSize: 10, 
        color: focused ? '#FF6B6B' : 'gray',
        marginTop: 2 
      }}>
        {routeName}
      </Text>
    </View>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} routeName={route.name} />
        ),
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={PriceDetailsScreen} />
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