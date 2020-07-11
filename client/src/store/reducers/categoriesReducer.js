import {FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_SUCCESS} from "../actions/categoriesActions";

const initialState = {
  categories: [],
  category: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case FETCH_CATEGORY_SUCCESS:
      return {...state, category: action.category};
    default:
      return state;
  }
};

export default categoriesReducer;