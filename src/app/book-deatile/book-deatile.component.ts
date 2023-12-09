import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-deatile',
  templateUrl: './book-deatile.component.html',
  styleUrls: ['./book-deatile.component.css']
})
export class BookDeatileComponent {
  data: any;
  id: string | null;
  success: boolean = false;

  constructor(private bookservice: ApiService, private router: ActivatedRoute, private auth: AuthService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.bookservice.getBookDetails(this.id).subscribe((book) => { this.data = book })
  }



  add() {
    let _id;
    this.auth.getUser().then((user) => { _id = user.id; })
    const item = {
      id: _id,
      product: this.data.title,
      price: this.data.rate
    };
    this.bookservice.addItemToShopcart(item).subscribe(result => { console.log(result) });
    this.success = true;
  }


}
