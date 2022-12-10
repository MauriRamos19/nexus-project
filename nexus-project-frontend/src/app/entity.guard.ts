import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
 
  checkUserLogin(route: ActivatedRouteSnapshot): boolean  {
    if(localStorage.getItem('STATE')) {
      if(localStorage.getItem('STATE') === 'true') {
        const entityType = localStorage.getItem('ENTITY');
        if(route.data['entity'] && route.data['entity'].indexOf(entityType) === -1) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
    this.router.navigate(['/']);
    return false;
  }
  
}
