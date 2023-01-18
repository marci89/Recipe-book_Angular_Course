import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            "Food",
            "the thing",
            "https://www.allrecipes.com/thmb/pl6IzWa0p5VGZP-8ZsF4wfpEIwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8000900-2000-d41f8a550fe5444894bf4a9e4d84fd1c.jpg",
            [
                new Ingredient("meat", 1),
                new Ingredient("French Fries", 20)
            ]
        ),
        new Recipe(
            "Food2",
            "the thing",
            "https://www.allrecipes.com/thmb/pl6IzWa0p5VGZP-8ZsF4wfpEIwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8000900-2000-d41f8a550fe5444894bf4a9e4d84fd1c.jpg",
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

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}