import {FETCH_ARTICLE_SUCCESS, FETCH_ARTICLES_SUCCESS} from "../actions/articlesActions";

const initialState = {
  articles: [],
  article: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {...state, articles: action.articles};
    case FETCH_ARTICLE_SUCCESS:
      return {...state, article: action.article};
    default:
      return state;
  }
};

export default articlesReducer;