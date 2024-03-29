import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  message = ''

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    if (this.loginForm.invalid) return;

    const user = new User();
    user.email = this.loginForm.value.email ?? '';
    user.password = this.loginForm.value.password ?? '';

    this.auth.loginPost(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); 
          this.message = 'Login Successful!';
        },
        error: (error) => {
          alert('Login failed ' + error.message);
          this.router.navigate(['']);
        }
      },
    );
  }

}
