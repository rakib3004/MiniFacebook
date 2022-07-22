import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputStatus: Number = 0;

  
  serverErrorMessages: string | undefined;

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router,private userService:UserService) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()) this._router.navigate(['/homepage']);
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }
  

  login(){
    if(!this.loginForm.valid){
      this.inputStatus = 1;
      return;
    }
    
    this.userService.login(this.loginForm.value).subscribe(
      data =>{
        this.userService.setToken(data['token']);
        this._router.navigate(['/homepage']);
      } ,
      error=>console.error(error)
    )
  }

}
