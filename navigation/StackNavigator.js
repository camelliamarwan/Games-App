import {createNativeStackNavigator} from '@react-navigation/native-stack';
import  React from 'react';
import {routers} from '../utils/routers';
import DetailsScreen from '../screens/DetailsScreen';
import { StyleSheet } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import DrawerScreen from './DrawerNavigator';

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={routers.splash} component={SplashScreen}/>
            <Stack.Screen name={routers.drawer} component={DrawerScreen}/>
            <Stack.Screen name={routers.details} component={DetailsScreen}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default StackNavigator;