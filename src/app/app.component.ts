import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { slideInAnimation } from "../assets/animations/animations";
import { Subscription } from 'rxjs';

export let browserRefresh: boolean = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'barterr';
  gtag: Function;
  fbq: Function;
  subscription: Subscription;
  constructor(private router: Router) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  onActivate(event) {
    window.scrollTo({top:0,behavior:'smooth'});
  }
}
