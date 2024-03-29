import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable, take } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root'})
export class AuthGurad implements CanActivate{
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
              return authState.user;
            }),
            map( user => {
            const isAuth = !!user;
            if (isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }))
    }
}
