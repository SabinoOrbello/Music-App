import {
  SET_FIRST_SECTION,
  SET_SEARCH_RESULTS,
  SET_SECOND_SECTION,
  SET_SELECTED_SONG,
  SET_THIRD_SECTION,
} from "../actions/action";

const initialState = {
  firstSection: null,
  secondSection: null,
  thirdSection: null,
  searchResults: null,
  selectedSong: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRST_SECTION:
      return {
        ...state,
        firstSection: action.payload,
      };
    case SET_SECOND_SECTION:
      return {
        ...state,
        secondSection: action.payload,
      };
    case SET_THIRD_SECTION:
      return {
        ...state,
        thirdSection: action.payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SET_SELECTED_SONG:
      return {
        ...state,
        selectedSong: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
