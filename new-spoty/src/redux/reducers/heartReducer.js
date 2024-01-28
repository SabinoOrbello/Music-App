import { TOGGLE_HEART } from "../actions/action";

const initialState = {};

const heartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HEART:
      const { cardId } = action.payload;
      return {
        ...state,
        [cardId]: !state[cardId],
      };
    default:
      return state;
  }
};
export default heartReducer;
