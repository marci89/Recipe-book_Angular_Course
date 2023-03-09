import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-57d64-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-57d64-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map((responseData) => {
                    const postArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postArray.map((recipe) => {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }
                        return recipe;
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
    }
}
