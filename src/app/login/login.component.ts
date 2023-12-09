import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  class: any = "";
  flag: Boolean | undefined;
  message!: string;
  ngOnInit() {

  }
  registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
  });

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  signup() {
    this.class = "right-panel-active";
    console.log("hi")
  }

  sigin() {
    this.class = "";
  }
  constructor(private api: AuthService, private router: Router) {
    const name = localStorage.getItem('user')
    console.log(name);
  }
  newUserSubmit() {
    if (this.registerForm.valid) {
      this.api.userRegister(this.registerForm.value).then((res) => {
        console.log(res);
        if (res.flag) {
          this.router.navigate(['/']);
        } else {
          this.flag = true;
          this.message = res.message;
        }
      }).catch((err) => { confirm(err); });
    } else {
      this.flag = true;
      this.message = "Please fill all the fields"
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.api.userLogin(this.loginForm.value).then((res) => {
        console.log(res);
        if (res.flag) {
          this.router.navigate(['/']);
        } else {
          this.flag = true;
          this.message = res.message;
        }
      })
    } else {
      this.flag = true;
      this.message = 'Please enter username and password';
    }
  }


}
