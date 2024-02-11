import { Component } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Licznik Kalorii';
  ngOnInit() {
    AOS.init({
      once: true,
      duration: 1500
    });
  }

}
