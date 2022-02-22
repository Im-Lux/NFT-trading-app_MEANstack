import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        image: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordAgain: new FormControl(''),
      },
      { validator: this.checkPasswords() }
    );

    this.authService.registrationError.subscribe((response) => {
      this.errorMessage = response;
    });
  }

  checkPasswords() {
    return (group: FormGroup) => {
      const password = group.controls['password'];
      const passwordAgain = group.controls['passwordAgain'];
      if (password.value != passwordAgain.value) {
        return passwordAgain.setErrors({ notEqual: true });
      } else {
        passwordAgain.setErrors(null);
      }
    };
  }

  registerUser() {
    const { passwordAgain, ...user } = this.registerForm.value;
    this.authService.registerUser(user);
  }
}
