import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyShiftsScreen from './screens/MyShiftsScreen';
import AvailableShiftsScreen from './screens/AvailableShiftsScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Shifts" component={ShiftsTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const ShiftsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyShifts" component={MyShiftsScreen} />
      <Tab.Screen name="AvailableShifts" component={AvailableShiftsScreen} />
    </Tab.Navigator>
  );
}

export default App;
