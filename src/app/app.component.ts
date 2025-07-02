import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'freeMindFrontend';

  constructor(private router: Router) {}

  showMenu(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl === '/login' || currentUrl === '/');
  }
}
