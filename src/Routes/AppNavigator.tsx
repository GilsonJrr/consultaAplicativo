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
        tabBarIcon: ({color}) => {
          let iconName = '';

          if (route.name === 'Agenda') {
            iconName = 'calendar-month';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#566246',
        tabBarInactiveTintColor: '#D0D4BC',
        headerShown: false,
        tabBarStyle: {
          marginBottom: 10,
          marginHorizontal: 10,
          paddingVertical: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: '#F8FCE1',
          position: 'absolute',
          height: 60,
        },
        tabBarLabelStyle: {paddingBottom: 0},
      })}>
      <Tab.Screen
        name="Agenda"
        component={Calendar}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen name="Home" component={Home} options={{tabBarLabel: ''}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
