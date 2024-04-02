import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../utils/validation';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  displayPw = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  showPassword(b: boolean) {
    this.displayPw = b;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validation.passwordValidator({
              minLength: 3,
              minLowercase: 0,
              minSymbols: 0,
              minNumbers: 0,
              minUppercase: 0,
            })
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const user = new User();
      user.email = this.registerForm.value.email ?? '';
      user.password = this.registerForm.value.password ?? '';
      this.auth.registerPost(user).subscribe();
      this.router.navigate(['login']);
    }
    else alert("Invalid")
  }


}
