import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }