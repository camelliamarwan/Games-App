const baseUrl = 'https://api.rawg.io/api';
const apiKey = 'key=7e6edd5db33d45089d6acc5442a100a9';

export const getGames = async (page, searchQuery, genre, ordering, dates) => {
  const url = `${baseUrl}/games?${apiKey}&page=${page}${searchQuery ? `&search=${searchQuery}` : ''}${genre ? `&genres=${genre}` : ''}${ordering ? `&ordering=${ordering}` : ''}${dates ? `&dates=${dates}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};


export const getGameDetails = async (id) => {
  const url = `${baseUrl}/games/${id}?${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getGenres = async () => {
  const url = `${baseUrl}/genres?${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

