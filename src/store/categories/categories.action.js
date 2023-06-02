import { createAction } from '../../utils/reducer/reducer.util';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const setCategories = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
};