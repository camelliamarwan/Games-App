import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../utils/colors';

const GameCard = ({ game, onPress, onFavouritePress, isFavourite }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {game.background_image && (
        <Image source={{ uri: game.background_image }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
          <View style={styles.ratingRow}>
            <AntDesign name="star" size={12} color={colors.accent} />
            <Text style={styles.rating}>{game.rating}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onFavouritePress} style={styles.favButton}>
          <AntDesign
            name="heart"
            size={22}
            color={isFavourite ? colors.accent : colors.white}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  favButton: {
    padding: 8,
  },
});

export default GameCard;