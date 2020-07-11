import axiosApi from "../../axiosApi";

export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';

export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';

export const fetchArticlesSuccess = articles => ({type: FETCH_ARTICLES_SUCCESS, articles});
export const createArticleSuccess = () => ({type: CREATE_ARTICLE_SUCCESS});
export const fetchArticleSuccess = article => ({type: FETCH_ARTICLE_SUCCESS, article});

export const fetchArticles = categoryId => {
  return async (dispatch) => {
    let url = '/articles';

    if (categoryId) {
      url += '?category=' + categoryId;
    }

    const response = await axiosApi.get(url);
    dispatch(fetchArticlesSuccess(response.data));
  };
};

export const createArticle = articleData => {
  return async (dispatch) => {
    await axiosApi.post('/articles', articleData);
    dispatch(createArticleSuccess());
  };
};

export const fetchArticle = articleId => {
  return async dispatch => {
    const response = await axiosApi.get('/articles/' + articleId);
    dispatch(fetchArticleSuccess(response.data));
  }
};