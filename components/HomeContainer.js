import React from 'react'
import Icon from 'react-native-vector-icons/dist/Feather'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Detail from './Detail'

function HomeContainer () {
  let Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRoute='Home'
      initialRouteName='Home'
      activeColor='#02ad94'
      inactiveColor='#dedede'
      screenOptions={{
        headerShown: false
      }}
      style={{ backgroundColor: '#000' }}
      barStyle={{ backgroundColor: '#0f0f0f', paddingVertical: 5 }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon name='home' size={28} color={color} />
          )
        }}
      />
      <Stack.Screen
        name='Detail'
        component={Detail}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon name='home' size={28} color={color} />
          )
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeContainer
