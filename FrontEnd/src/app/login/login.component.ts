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

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router,private userService:UserService) { }

  ngOnInit() {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      alert("invalid form");
      console.log('Invalid');return;
    }
    
    this.userService.login(this.loginForm.value)
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/homepage']);} ,
      error=>console.error(error)
    )
  }

}
