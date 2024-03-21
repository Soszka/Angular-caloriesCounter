import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  sectionName = "LOGOWANIE";
  sectionDescription = "Zaloguj się, żeby dokonywać zmiany w tabeli produktów dostępnych w zakładce ŻYWNOŚĆ";
  loginForm: FormGroup;
  isLoading = false;
  isLoggedIn = false;
  showMessage = false;
  shouldNavigate = false;
  messageInfo = "";
  
  constructor ( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.messageInfo = "Uzupełnij wszystkie pola!";
      this.showMessage = true;
    } else if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true; 
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false; 
          this.isLoggedIn = true;
          this.messageInfo = "Pomyślnie zalogowano! Możesz teraz dokonywać zmiany w tabeli produktów.";
          this.showMessage = true;
          this.shouldNavigate = true; 
        },
        error: (err) => {
          this.isLoading = false; 
          this.loginForm.reset(); 
          this.messageInfo = "Wprowadzono błędny login lub hasło. Spróbuj ponownie!";
          this.showMessage = true;
          console.error('Błąd logowania:', err);
        }
      });
    }
  }

  onLogout() {
    this.isLoggedIn = false;
    this.loginForm.reset();  
    localStorage.removeItem('authToken'); 
    this.messageInfo = "Pomyślnie wylogowano !";
    this.showMessage = true;
  }

  onOkClick() {
    this.showMessage = false;
    if (this.isLoggedIn) {
      this.router.navigate(['meals'])
    }
  }
}
