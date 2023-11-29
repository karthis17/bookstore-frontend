import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-deatile',
  templateUrl: './book-deatile.component.html',
  styleUrls: ['./book-deatile.component.css']
})
export class BookDeatileComponent {
  data:any;
  id: string | null;
  success: boolean = false;
  constructor(private bookservice: ApiService, private router: ActivatedRoute) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.bookservice.getBookDetails(this.id).subscribe((book) => {this.data=book})
  }

  submit(){
    console.log('submit')
  }

  add(){
    const item = {
      id: JSON.parse(this.bookservice.checkUserLogState())[0].id,
      product: this.data.title,
      price: this.data.rate
    };
    this.bookservice.addItemToShopcart(item).subscribe(result=>{console.log(result)});
    this.success=true;
  }


}
