import { FETCH_COCKTAIL, FETCH_COCKTAILS, FETCH_INGREDIENTS, MATCH_INGREDIENTS } from './types';

import { findMatches, returnMax } from '../helpers';
import axios from 'axios';

const ROOT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchIngredients = () => async dispatch => {
    const res = await axios.get(`${ROOT_URL}list.php?i=list`);
    dispatch({ type: FETCH_INGREDIENTS, payload: res.data.drinks });
}

export const matchIngredients = (searchInput, array) => dispatch => {
    const maxNum = 5;
    let res = findMatches(searchInput, array);
    if (res.length > maxNum) {
        res = returnMax(maxNum, res)
    }
    dispatch({ type: MATCH_INGREDIENTS, payload: res })
}

export const fetchCocktails = (ingredient) => async dispatch => {
    const res = await axios.get(`${ROOT_URL}filter.php?i=${ingredient}`);
    dispatch({ type: FETCH_COCKTAILS, payload: res.data.drinks });
}

export const fetchCocktail = (cocktailId) => async dispatch => {
    const res = await axios.get(`${ROOT_URL}lookup.php?i=13060`);
    dispatch({ type: FETCH_COCKTAIL, payload: res.data.drinks[0] });
}