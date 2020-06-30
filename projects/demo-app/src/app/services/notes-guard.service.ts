import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GigyaService } from './gigya.service';

@Injectable()
export class NotesGuard implements CanActivate {
  constructor(
    public gigyaService: GigyaService,
    public router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.gigyaService.isLoggedIn().pipe(
      tap((canActivate) => {
        if (!canActivate) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
