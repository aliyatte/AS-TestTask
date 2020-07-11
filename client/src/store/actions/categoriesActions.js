import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategorySuccess = category => ({type: FETCH_CATEGORIES_SUCCESS, category});
export const createCategorySuccess = () => ({type: CREATE_CATEGORY_SUCCESS});



export const fetchCategories = () => {
  return async dispatch => {
    const response = await axiosApi.get('/categories');

    dispatch(fetchCategoriesSuccess(response.data));
  }
};