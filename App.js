import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FavouritesContextProvider from './context/FavouritesContext';

export default function App() {
  return (
    <NavigationContainer>
      <FavouritesContextProvider>
      <StackNavigator />
      </FavouritesContextProvider>
    </NavigationContainer>
  );
}