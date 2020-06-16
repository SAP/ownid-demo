import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { map } from "rxjs/operators";
import { GigyaService } from "@services/gigya.service";
import { Observable } from "rxjs";

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(public gigyaService: GigyaService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.gigyaService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl("/login");
        }

        return isLoggedIn;
      })
    );
  }
}
