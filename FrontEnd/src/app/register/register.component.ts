import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSucessMessage: boolean = false;
  serverErrorMessages: string = 'false';

  registerForm = this.formBuilder.group({
    name:new FormControl(null,Validators.required),
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
    
    if((this.registerForm.get('password')?.value != this.registerForm.get('cpass')?.value)){
      this.serverErrorMessages = "Password Mismatched!!!!";
      return;
    }

    this.serverErrorMessages='false';
    this.userService.postUser(this.registerForm.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {this.showSucessMessage = false; this._router.navigate(['/login'])}, 3000);
        this.registerForm.reset();
      },
      err => {
        if (err.status === environment.registrationError) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = environment.serverError;
      }
    )
     
  }

}
