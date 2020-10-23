import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GigyaService } from './gigya.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public gigyaService: GigyaService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.gigyaService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/notes');
        }

        return !isLoggedIn;
      }),
    );
  }
}
