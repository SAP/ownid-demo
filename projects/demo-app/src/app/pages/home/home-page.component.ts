import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OwnIDFlow } from '../../../environments/i-environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  readonly flow = environment.flow;

  readonly OwnIDFlow = OwnIDFlow;
}
