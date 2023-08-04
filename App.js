
import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
// import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Home from './components/Home'
import Recents from './components/Recents'
import Profile from './components/Profile'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import HomeContainer from './components/HomeContainer';

const Tab = createMaterialBottomTabNavigator()



const App = () => {
 
  
  return (
      <NavigationContainer>
      <Tab.Navigator
      initialRoute ="Home"
      activeColor="#02ad94"
      inactiveColor="#dedede"
      screenOptions={{
        headerShown: false
      }}
      style={{backgroundColor:'#000'}}
      barStyle={{backgroundColor: "#0f0f0f",paddingVertical:5}}
      >
        <Tab.Screen 
        name="HomeContainer" 
        component ={HomeContainer}
        options={{
          tabBarLabel:'',
          tabBarIcon: ({color}) => (
            <Icon name="home" size={28} color={color} />
          )
        }} />

        <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarLabel:'',
          tabBarIcon: ({color}) => (
            <Icon name="account" size={28} color={color} />
          )
        }}
        />
        
        <Tab.Screen 
        name="Recents" 
        component={Recents} 
        options={{
          tabBarLabel:'',
          tabBarIcon: ({color}) => (
            <Icon name="movie" size={28} color={color} />
          )
        }}
        />
      </Tab.Navigator>
      </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems:'center',
    height: 120,
  },
  text: {
    color: 'white',
  }
});

export default App;
