import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import GameCard from '../components/GameCard';
import { useNavigation } from '@react-navigation/native';
import { routers } from '../utils/routers';
import { colors } from '../utils/colors';

const FavouritesScreen = () => {
  const { favourites, dispatch } = useContext(FavouritesContext);
  const { navigate } = useNavigation();

  if (favourites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎮</Text>
        <Text style={styles.emptyTitle}>No Favourites Yet</Text>
        <Text style={styles.emptySubtitle}>Heart a game to save it here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            isFavourite={true}
            onPress={() => navigate(routers.details, { game: item })}
            onFavouritePress={() => dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default FavouritesScreen;