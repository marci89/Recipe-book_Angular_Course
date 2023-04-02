import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions'


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) { }

  /*   storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-57d64-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
            });
    } */

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
                    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                }));
    }
}
