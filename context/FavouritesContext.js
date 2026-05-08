import {createContext, useState, useEffect, useReducer} from 'react';
import {favouritesReducer} from '../reducers/favouritesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext()

const FavouritesContextProvider = ({children}) => {
  const [favourites, dispatch] = useReducer(favouritesReducer, [])
  useEffect(() =>{
    const loadFavourites = async () => {
      const savedFavourites = await AsyncStorage.getItem("favourites")
      if(savedFavourites){
        dispatch({type:"LOAD_FAVOURITES", payload: JSON.parse(savedFavourites)})
      }
    }
    loadFavourites();
    }, [])

    useEffect(() => {
      const saveFavourites = async () => {
        await AsyncStorage.setItem("favourites",
          JSON.stringify(favourites)
        )
      }
      saveFavourites();
    }, [favourites])
  return(
    <FavouritesContext.Provider value={{favourites, dispatch}}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;