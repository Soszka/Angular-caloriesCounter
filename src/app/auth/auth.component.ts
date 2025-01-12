import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  sectionName = 'ZALOGOWANIA';
  sectionDescription = 'Zacznij od ...';
  loginForm: FormGroup;
  isLoading = false;
  isLoggedIn = false;
  showMessage = false;
  shouldNavigate = false;
  messageInfo = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.messageInfo = 'Uzupełnij wszystkie pola!';
      this.showMessage = true;
    } else {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.isLoggedIn = true;
          this.messageInfo =
            'Pomyślnie zalogowano! Możesz teraz dokonywać zmiany w tabeli produktów.';
          this.showMessage = true;
          this.shouldNavigate = true;
        },
        error: (err) => {
          this.isLoading = false;
          this.loginForm.reset();
          this.messageInfo =
            'Wprowadzono błędny login lub hasło. Spróbuj ponownie!';
          this.showMessage = true;
          console.error('Błąd logowania:', err);
        },
      });
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.loginForm.reset();
    this.showMessage = true;
    this.messageInfo = 'Pomyślnie wylogowano!';
    this.shouldNavigate = false;
  }

  onOkClick() {
    this.showMessage = false;
    if (this.isLoggedIn) {
      this.router.navigate(['meals']);
    }
  }

  onTestClick() {
    this.loginForm.setValue({
      email: 'bartek@bartek.com',
      password: 'Bartek123!',
    });
    this.snackBar.open(
      'Wprowadzono dane do logowania. Teraz kliknij "ZALOGUJ".',
      '',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
  }
}
