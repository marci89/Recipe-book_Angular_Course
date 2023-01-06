import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipes: Recipe[] = [
  new Recipe(
    "Food",
    "the thing",
    "https://www.allrecipes.com/thmb/pl6IzWa0p5VGZP-8ZsF4wfpEIwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8000900-2000-d41f8a550fe5444894bf4a9e4d84fd1c.jpg"
    ),
    new Recipe(
      "Food2",
      "the thing",
      "https://www.allrecipes.com/thmb/pl6IzWa0p5VGZP-8ZsF4wfpEIwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8000900-2000-d41f8a550fe5444894bf4a9e4d84fd1c.jpg"
      )
];

onRecipeSelected(recipe: Recipe){
this.recipeWasSelected.emit(recipe);
}
}
