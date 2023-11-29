import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  class:any = "";
  flag =false;
  registerForm= new FormGroup({
    name: new FormControl(""),
    username: new FormControl(""),
    password:new FormControl(""),
    address:new FormControl(""),
    phone:new FormControl(""),
  });

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  signup(){
    this.class = "right-panel-active";
    console.log("hi")
  }

  sigin(){
    this.class = "";
  }
  constructor(private api: ApiService , private router: Router){
    const name = localStorage.getItem('user')
    console.log(name);
  }
  newUserSubmit(){
    console.log(JSON.stringify(this.registerForm.value));
    if(this.api.userRegister(this.registerForm.value)){
      this.router.navigate(['/']);
      this.flag=false;
    } else {
      this.flag=true;
    }
  }

  login(){
    if(this.loginForm.valid){
      if(this.api.userLogin(this.loginForm.value)){
        if(this.api.checkUserLogState() !== null){
          this.router.navigateByUrl('/');
          this.flag = false;
        }
      } else {
      this.flag=true;
      }
    }
  }

}
