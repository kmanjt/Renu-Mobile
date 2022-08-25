import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") {
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (rn === "Details") {
                    iconName = focused ? 'list' : 'list-outline'
                } 
                else if (rn === "Settings") {
                    iconName = focused ? 'settings' : 'settings-outline'
                }

                return <Ionicons name={iconName} size={size} color={color}/>
            },
        })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Details" component={DetailsScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    );
};

export default MainContainer;