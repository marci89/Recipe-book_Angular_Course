import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable, take } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root'})
export class AuthGurad implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
      
        return this.authService.user.pipe(
            take(1),
            map( user => {
            const isAuth = !!user;
            if (isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }))
    }
}