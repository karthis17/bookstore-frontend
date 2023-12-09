import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  res: boolean = false;
  constructor(private http: HttpClient) { }
  endpoint: string = 'http://localhost:3000/api/';

  local: any;
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  getallBooks() {
    return this.http.get(this.endpoint + "books");
  }

  getBookDetails(id: any) {
    return this.http.get(this.endpoint + "books/get/" + id);
  }

  addBook(data: any) {
    return this.http.post(this.endpoint + "books/create", JSON.stringify(data));
  }

  getUserShopdetails(id: any) {
    return this.http.get(this.endpoint + "user/get/shop-cart-items/" + id);
  }

  addItemToShopcart(data: any) {
    console.log(data);
    return this.http.post(this.endpoint + "user/addshopcart", JSON.stringify(data), this._options)
  }

  delShopcarItem(data: any) {
    return this.http.post(this.endpoint + "user/shop/delete", JSON.stringify(data), this._options)
  }

  sendComment(comment: any, id: any, name: string) {
    // this.local = JSON.parse(this.checkUserLogState());
    const com = {
      id: id,
      name: name,
      comment: comment
    }
    console.log(com);
    this.http.post(this.endpoint + 'books/comments/add', JSON.stringify(com), this._options).subscribe();
  }

  getComments(id: string | null) {
    console.log(id);
    return this.http.get(this.endpoint + 'books/comments/get/' + id);
  }

  placeOrder(order: any) {
    return this.http.post(this.endpoint + "user/orders/create", JSON.stringify(order), this._options)
  }

  setOutOfStock(book_list: any) {
    book_list.forEach((book: String) => {
      this.http.get(this.endpoint + "books/add-to/out-of-stock/" + book).subscribe((res: any) => { console.log(res); });
    });

  }

  getOrderHistory(id: any) {
    return this.http.get(this.endpoint + "user/order-history/id/" + id);
  }

  searchBook(title: string) {
    return this.http.get(`${this.endpoint}books/search/${title.length === 0 ? '9' : title}`);
  }

}
