import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Licznik Kalorii';
  isLargeScreen!: boolean;
  faBars = faBars;
  faX = faX;
  @ViewChild('drawer') sidenav!: MatSidenav

  links = [
    { path: '/', name: 'WSTĘP', exact: true },
    { path: '/meals', name: 'ŻYWNOŚĆ', exact: false },
    { path: '/calories', name: 'KALORIE', exact: false },
    { path: '/auth', name: 'LOGOWANIE', exact: false },
    { path: '/calculator', name: 'KALKULATOR', exact: false }
  ];

  constructor() {
    this.checkScreenSize();
  }

  ngOnInit() {
    AOS.init({
      once: true,
      duration: 1500
    });
    localStorage.removeItem('authToken');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
      if (!this.isLargeScreen) {
      this.sidenav.close();
    }
  }

  onClose() {
    this.sidenav.close();
  }

  private checkScreenSize() {
    this.isLargeScreen = window.innerWidth > 1200;
  }
}
