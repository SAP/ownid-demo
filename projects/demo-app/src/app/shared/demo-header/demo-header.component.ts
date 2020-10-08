import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-header',
  templateUrl: './demo-header.component.html',
  styleUrls: ['./demo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoHeaderComponent { }
