import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequestPayload } from 'src/app/model/login-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError:boolean;
  loginRequestPayload:LoginRequestPayload;
  registerSuccessMessage:string;

  constructor(private authService:AuthService, private router:Router,
    private toastr : ToastrService, private activatedRoute:ActivatedRoute) {
    this.loginRequestPayload={
      username:'',
      password:''
    }
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.activatedRoute.queryParams.subscribe(
      params=>{
        if(params.registred !== undefined && params.redistred==='true'){
          this.toastr.success('Signup Succesful');
          this.registerSuccessMessage = 'Please Check your inbox and activate you account befor you can login'
        }
      }
    )
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data =>{
      if(data){
        console.log(data);
        console.log('login seccess');
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('login secess')
      }
      else{
        this.isError = true;
      }

    })
  }
}