import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupRequestPayload } from 'src/app/model/signup-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router:Router,
              private toastr : ToastrService) { 
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    
    this.authService.signup(this.signupRequestPayload)
    .subscribe(() => {
      console.log('Signup Successful');
      this.router.navigate(['/login'],{queryParams:{registred:'true'}});
    }, () => {
      console.log('Signup Failed');
      this.toastr.error('Registation Failed, Pleas try again')
    });
  }
}