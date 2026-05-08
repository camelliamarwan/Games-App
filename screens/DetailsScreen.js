import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getGameDetails } from '../service/api';
import { FavouritesContext } from '../context/FavouritesContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../utils/colors';

const DetailsScreen = () => {
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation();
  const { favourites, dispatch } = useContext(FavouritesContext);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavourite = favourites.some(fav => fav.id === params.game.id);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getGameDetails(params.game.id);
      setGame(data);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: params.game });
    } else {
      dispatch({ type: 'ADD_TO_FAVOURITES', payload: params.game });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {game.background_image && (
          <Image source={{ uri: game.background_image }} style={styles.image} />
        )}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <AntDesign name="left" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favButton} onPress={toggleFavourite}>
          <AntDesign
            name="heart"
            size={24}
            color={isFavourite ? colors.accent : colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{game.name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <AntDesign name="star" size={14} color={colors.accent} />
            <Text style={styles.badgeText}>{game.rating} / 5</Text>
          </View>
          {game.metacritic && (
            <View style={[styles.badge, styles.metacriticBadge]}>
              <Text style={styles.badgeText}>Metacritic: {game.metacritic}</Text>
            </View>
          )}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{game.released}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.tagsRow}>
          {game.genres && game.genres.map(g => (
            <View key={g.id} style={styles.tag}>
              <Text style={styles.tagText}>{g.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Platforms</Text>
        <View style={styles.tagsRow}>
          {game.platforms && game.platforms.map(p => (
            <View key={p.platform.id} style={styles.tag}>
              <Text style={styles.tagText}>{p.platform.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {game.description_raw ? game.description_raw.slice(0, 600) + '...' : 'No description available.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 280,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  favButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  metacriticBadge: {
    borderWidth: 1,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default DetailsScreen;