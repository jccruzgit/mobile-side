import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'List',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'QR Scanner',
        url: '/qr',
        icon: 'qr-scanner'
      }
  ];
  public labels = [];
  constructor() {}
}
