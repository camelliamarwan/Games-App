export function favouritesReducer(state,action){
  // console.error("state : ", state, "action : ", action)
  switch(action.type){
    case "ADD_TO_FAVOURITES":
      return [...state, action.payload]
    case "LOAD_FAVOURITES":
      return action.payload
    case "REMOVE_FROM_FAVOURITES":
      return state.filter(game => game.id !== action.payload.id)
  }
  return state;
}