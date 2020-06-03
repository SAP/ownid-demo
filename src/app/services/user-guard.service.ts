import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AppStore } from "../app.store";

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(public store: AppStore, public router: Router) {}

  canActivate(): boolean {
    if (Object.keys(this.store.profile$.getValue()).length === 0) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
