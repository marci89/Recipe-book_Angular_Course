import { Recipe } from "./recipe.model";
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
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
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}