import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  inputStatus: Number = 0;

  registerForm = this.formBuilder.group({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private _router:Router,private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    this.inputStatus = 0;
    if(!this.registerForm.valid ){
      this.inputStatus = 1;
      return;
    }
    else if((this.registerForm.get('password')?.value != this.registerForm.get('cpass')?.value)){
      this.inputStatus = 2;
      return;
    }

    this.inputStatus = 0;
    this.userService.register(this.registerForm.value).subscribe(
      data=> {
        if(JSON.stringify(data)=="false"){
          this.inputStatus = 3;
          this.registerForm.reset();
        }
        else {
          alert("Congratulations!!!! You have Successfully Registerd. You can Log in Now.")
          this._router.navigate(['/login']);
        }
      },
      error=>console.error(error)
    )
     
  }

}
