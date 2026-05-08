import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { routers } from '../utils/routers';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { colors } from '../utils/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: colors.primary,
        },
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerLabelStyle: {
          color: colors.white,
          fontSize: 16,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen name={routers.home} component={HomeScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name={routers.fav} component={FavouritesScreen} options={{ title: 'Favourites' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;