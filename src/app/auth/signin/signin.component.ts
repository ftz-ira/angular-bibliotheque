import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: string;
  

  constructor(private authService: AuthService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

   this.authService.signInUser(email, password).then(
     ()=>{
      this.message = 'connected';
       this.route.navigate(['books']);
     },
     (error) => {
      this.message = error;
     }
   );

  }

}
