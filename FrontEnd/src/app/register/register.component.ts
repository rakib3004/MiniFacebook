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

  registerForm = this.formBuilder.group({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,Validators.required),
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
    if(!this.registerForm.valid || (this.registerForm.get('password')?.value != this.registerForm.get('cpass')?.value)){
      alert('Invalid Form'); return;
    }

    this.userService.register(this.registerForm.value)
    .subscribe(
      data=> {
        console.log(data); 
        if(JSON.stringify(data)=="false"){
          this.registerForm.reset();
          alert("Email Address already used in an account");
        }
        else this._router.navigate(['/login']);
      },
      error=>console.error(error)
    )
     
  }

}
