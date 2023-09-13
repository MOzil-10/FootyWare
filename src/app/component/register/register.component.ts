import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomvalidationServiceService } from 'src/app/service/customvalidation-service.service';
import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor( 
    private fb: FormBuilder,
    private customValidator: CustomvalidationServiceService,
    private users: UsersService
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
     
      const userData: User = this.registerForm.value;

      this.users.addUser(userData)
      .subscribe(
        (response)=>{
          alert('Registration successful')
          console.log('response', response);
          this.registerForm.reset();
          
        },
        (error) => {
          alert('Registration failed!');
          console.error('Error:', error);
        }

      );
    }
  }
}

