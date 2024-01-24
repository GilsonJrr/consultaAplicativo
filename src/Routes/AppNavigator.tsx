import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../Views/User/Home';
import Calendar from '../Views/User/Calendar';
import Profile from '../Views/User/Profile';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconName = '';

          if (route.name === 'Calendario') {
            iconName = 'event';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#211504',
        tabBarInactiveTintColor: '#D0D4BC',
        headerShown: false,
        //Tab bar styles can be added here
        tabBarStyle: {
          marginBottom: 10,
          marginHorizontal: 10,
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: '#F8FCE1',
          position: 'absolute',
          height: 50,
        },
        tabBarLabelStyle: {paddingBottom: 3},
      })}>
      <Tab.Screen name="Calendario" component={Calendar} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
