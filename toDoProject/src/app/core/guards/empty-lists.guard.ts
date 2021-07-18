import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { first } from 'rxjs/operators';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyListsGuard implements CanActivate {
  constructor(
    private state: StateService, 
    private router: Router
  ){}

  async canActivate(): Promise<boolean | UrlTree> {
    const lists = this.state.getAllLists()
        .pipe(first())
        .toPromise();
      const listCount = (await lists).length;

      if (listCount > 0) return true;
      return this.router.createUrlTree(['lists', -1, 'edit']);   
  }
  
}
