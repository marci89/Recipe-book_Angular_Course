import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, withLatestFrom} from 'rxjs';
import * as RecipesActions from './recipe.actions'
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { environment } from 'src/environments/environment';

@Injectable()
export class RecipeEffects {

  authLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        environment.firebaseDatabaseUrl + '/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  ));

  storeRecipes = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        environment.firebaseDatabaseUrl +'/recipes.json',
        recipesState.recipes
      );
    })),
  { dispatch: false }
  );

constructor( private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}
}
