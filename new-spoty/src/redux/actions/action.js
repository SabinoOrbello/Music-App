export const SET_FIRST_SECTION = "SET_FIRST_SECTION";
export const SET_SECOND_SECTION = "SET_SECOND_SECTION";
export const SET_THIRD_SECTION = "SET_THIRD_SECTION";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_SELECTED_SONG = "SET_SELECTED_SONG";
export const TOGGLE_HEART = "TOGGLE_HEART ";

export const setFirstSection = (data) => ({
  type: SET_FIRST_SECTION,
  payload: data,
});

export const setSecondSection = (data) => ({
  type: SET_SECOND_SECTION,
  payload: data,
});

export const setThirdSection = (data) => ({
  type: SET_THIRD_SECTION,
  payload: data,
});
export const setSearchResults = (data) => ({
  type: SET_SEARCH_RESULTS,
  payload: data,
});
export const setSelectedSong = (song) => ({
  type: SET_SELECTED_SONG,
  payload: song,
});
export const toggleHeart = (cardId) => ({
  type: TOGGLE_HEART,
  payload: { cardId },
});

// Azione asincrona per eseguire la chiamata API e dispacciare azioni in base alla risposta
export const fetchArtistData = (artistName) => {
  return async (dispatch) => {
    try {
      // Effettua la chiamata API
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`);
      if (response.ok) {
        // Converti la risposta in formato JSON
        const data = await response.json();
        console.log(data);

        // Dispaccia l'azione corrispondente all'artista
        switch (artistName) {
          case "radiohead":
            dispatch(setFirstSection(data));
            break;
          case "placebo":
            dispatch(setSecondSection(data));
            break;
          case "moderat":
            dispatch(setThirdSection(data));
            break;
          default:
            console.log("Nothing to dispatch");
            break;
        }
      } else {
        throw new Error("Error fetching artist data");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

export const searchArtist = (query) => {
  return async (dispatch) => {
    try {
      // Effettua la chiamata API di ricerca con la query fornita
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
      if (response.ok) {
        // Converti la risposta in formato JSON
        const data = await response.json();

        // Dispaccia l'azione corrispondente alla ricerca dell'artista
        dispatch(setSearchResults(data));
      } else {
        throw new Error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};
