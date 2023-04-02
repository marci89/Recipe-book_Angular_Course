import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions'

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [
    new Recipe(
      "Tasty schnitzel",
      "A super tasty schnitzel - just awesome!",
      "https://external-preview.redd.it/BfcCSSgkoLSH4S8_nq29r_odf4rhWHkmLqu4aLM27lg.jpg?auto=webp&s=ce40ec37f64b4acdbf0fa8554bd185fcf8d2001f",
      [
        new Ingredient("meat", 1),
        new Ingredient("French Fries", 20)
      ]
    ),
    new Recipe(
      "Big fat burger",
      "What else you need to say?",
      "https://bigfatburgers.com/wp-content/uploads/2019/07/DoubleBaconCheeseBurger.jpg",
      [
        new Ingredient("Buns", 2),
        new Ingredient("Meat", 1)
      ]
    )
  ]
};

export function recipeReducer(state : State = initialState, action: RecipesActions.RecipesActions) {

  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

      case RecipesActions.ADD_RECIPES:
        return {
          ...state,
          recipes: [...state.recipes, action.payload]
        };

        case RecipesActions.UPDATE_RECIPES:
          const updatedRecipe = { ...state.recipes[action.payload.index], ...action.payload.newRecipe };

          const updatedRecipes = [...state.recipes];
          updatedRecipes[action.payload.index] = updatedRecipe;
          return {
            ...state,
            recipes: updatedRecipes
          };

          case RecipesActions.DELETE_RECIPES:
            return {
              ...state,
              recipes: state.recipes.filter((recipe, index) => {
                return index !== action.payload;
              })
            };
    default:
      return state;

  }

}
