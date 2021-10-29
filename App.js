import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, LogBox} from 'react-native';
LogBox.ignoreAllLogs()
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {connect} from 'react-redux';

import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Absent from './src/screens/Absent';
import Daily from './src/screens/Daily';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import EditPassword from './src/screens/EditPassword';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HistoryAbsents from './src/screens/HistoryAbsents';
import HistoryDaily from './src/screens/HistoryDaily';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        barStyle={styles.background}
        activeColor="#F4F4F4"
        inactiveColor="#cfcfcf">
        <Tab.Screen
          name="Absent"
          component={Absent}
          options={{
            tabBarLabel: 'Absent',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="table-account"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Daily"
          component={Daily}
          options={{
            tabBarLabel: 'Daily Report',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="card-text-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <EvilIcons name="user" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FF7314',
  },
});

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.auth.token === null ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={BottomTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: 'Edit Profile',
                headerStyle: {
                  backgroundColor: '#FF7314',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="EditPassword"
              component={EditPassword}
              options={{
                title: 'Edit Password',
                headerStyle: {
                  backgroundColor: '#FF7314',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="HistoryAbsents"
              component={HistoryAbsents}
              options={{
                title: 'History Absen',
                headerStyle: {
                  backgroundColor: '#FF7314',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="HistoryDaily"
              component={HistoryDaily}
              options={{
                title: 'History Daily Reports',
                headerStyle: {
                  backgroundColor: '#FF7314',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
