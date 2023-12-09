import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'bookstore';
  logState!: boolean;
  user: any;
  search_book!: FormControl;
  data: any;
  option?: any;

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.loggedIn.subscribe(async (state: boolean) => {
      if (state) {
        setTimeout(async () => {
          this.user = await this.auth.getUser();
          console.log(state, this.user);
          this.logState = state;
          console.log(this.logState);
        }, 100);
      }
    });
    console.log(this.user);
    this.search_book = new FormControl('', Validators.required);
  }

  navigate(id: string) {
    this.search_book.setValue("");
    this.router.navigateByUrl(`/book/${id}`);
  }

  async search() {

  }

  async onChange() {
    this.api.searchBook(this.search_book.value).subscribe((book) => {
      this.data = book.valueOf();
      this.option = this.data['data'];
    });
  }

  logout() {
    this.auth.logout();
    this.logState = false;
  }

  shopcart() {
    if (this.auth.getUser() == null) {
      alert("please login.")
    } else {
      this.router.navigateByUrl('/shop-cart/' + this.user.id);
    }
  }

}
