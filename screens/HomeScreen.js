import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getGames, getGenres } from '../service/api';
import { colors } from '../utils/colors';
import GameCard from '../components/GameCard';
import { useNavigation } from '@react-navigation/native';
import { routers } from '../utils/routers';
import { FavouritesContext } from '../context/FavouritesContext';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const { navigate } = useNavigation();
  const { dispatch, favourites } = useContext(FavouritesContext);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const data = await getGames(1, search, selectedGenre);
      setGames(data);
      setLoading(false);
    };
    fetchGames();
  }, [search, selectedGenre]);

  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
    if (sortBy === '-name') return (b.name || '').localeCompare(a.name || '');
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'released') return new Date(b.released || 0) - new Date(a.released || 0);
    return 0;
  });

  const filterOptions = [
    { label: 'Top Rated', value: 'rating' },
    { label: 'A to Z', value: 'name' },
    { label: 'Z to A', value: '-name' },
    { label: 'Newest', value: 'released' },
  ];

  const currentLabel = filterOptions.find(o => o.value === sortBy)?.label || 'Top Rated';

  return (
    <View style={styles.container}>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <AntDesign name="search" size={18} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search games..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <AntDesign name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(!showFilter)}>
          <Text style={styles.filterButtonText}>{currentLabel}</Text>
          <AntDesign name={showFilter ? 'up' : 'down'} size={12} color={colors.white} />
        </TouchableOpacity>
      </View>

      {showFilter && (
        <View style={styles.dropdown}>
          {filterOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dropdownItem, sortBy === option.value && styles.dropdownItemActive]}
              onPress={() => {
                setSortBy(option.value);
                setShowFilter(false);
              }}
            >
              <Text style={[styles.dropdownText, sortBy === option.value && styles.dropdownTextActive]}>
                {option.label}
              </Text>
              {sortBy === option.value && (
                <AntDesign name="check" size={14} color={colors.white} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <TouchableOpacity
          style={[styles.chip, selectedGenre === '' && styles.chipActive]}
          onPress={() => setSelectedGenre('')}
        >
          <Text style={[styles.chipText, selectedGenre === '' && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {genres.map(genre => (
          <TouchableOpacity
            key={genre.id}
            style={[styles.chip, selectedGenre === genre.slug && styles.chipActive]}
            onPress={() => setSelectedGenre(genre.slug)}
          >
            <Text style={[styles.chipText, selectedGenre === genre.slug && styles.chipTextActive]}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={sortedGames}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <GameCard
              game={item}
              isFavourite={favourites.some(fav => fav.id === item.id)}
              onPress={() => navigate(routers.details, { game: item })}
              onFavouritePress={() => {
                const isFav = favourites.some(fav => fav.id === item.id);
                dispatch({
                  type: isFav ? 'REMOVE_FROM_FAVOURITES' : 'ADD_TO_FAVOURITES',
                  payload: item,
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    zIndex: 999,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    paddingVertical: 12,
    fontSize: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    marginLeft: 8,
    gap: 6,
  },
  filterButtonText: {
    color: colors.white,
    fontSize: 12,
  },
  dropdown: {
    position: 'absolute',
    right: 16,
    top: 68,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    zIndex: 9999,
    elevation: 20,
    minWidth: 160,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dropdownItemActive: {
    backgroundColor: colors.primary,
  },
  dropdownText: {
    color: colors.white,
    fontSize: 14,
  },
  dropdownTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  chipsContainer: {
    paddingLeft: 16,
    marginBottom: 10,
    flexGrow: 0,
  },
  chip: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.white,
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});

export default HomeScreen;