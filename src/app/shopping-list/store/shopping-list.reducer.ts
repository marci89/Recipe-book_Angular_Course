import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListsActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[],
  editedIngrediet: Ingredient,
  editedIngredietIndex: number,
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10),],
  editedIngrediet: null,
  editedIngredietIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListsActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListsActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListsActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListsActions.UPDATE_INGREDIENT:

      const ingredient = state.ingredients[state.editedIngredietIndex];
      const updatedIngredient = {
        ...ingredient, ...action.payload
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredietIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredietIndex: -1,
        editedIngrediet: null
      };

    case ShoppingListsActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredietIndex;
        }),
        editedIngredietIndex: -1,
        editedIngrediet: null
      };

    case ShoppingListsActions.START_EDIT:
      return {
        ...state,
        editedIngredietIndex: action.payload,
        editedIngrediet: { ...state.ingredients[action.payload] }
      };

    case ShoppingListsActions.STOP_EDIT:
      return {
        ...state,
        editedIngredietIndex: -1,
        editedIngrediet: null
      };

    default:
      return state;
  }
};
