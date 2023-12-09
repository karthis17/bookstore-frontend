import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  price: any;
  res: any;
  favoriteSeason: any;
  shoppingForm!: FormGroup;
  item: any;


  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: ActivatedRoute, private route: Router) {
    this.auth.getUser().then((user) => { this.res = user; });
    this.price = router.snapshot.paramMap.get('price');
  }

  ngOnInit() {

    this.api.getUserShopdetails(this.res.id).subscribe((data) => { this.item = data })
    this.shoppingForm = this.formBuilder.group({
      address: ['', Validators.required],
      payment: ['', Validators.required],
      phone: ['', Validators.required],
      payment_ID: ['', Validators.required],
      total: ["₹" + this.price],
    });
  }

  submitShoppingForm() {
    if (this.shoppingForm.valid) {
      console.log(this.shoppingForm.value);
      let data = this.shoppingForm.value;
      data['id'] = this.res.id;
      data['product'] = this.item;
      if (data.payment == 'Cash on Delivery') data['payment_ID'] = "Cash on Delivery";
      this.api.placeOrder(data).subscribe(() => {

        const bookTitles = this.item.map((data: any) => data.product);
        console.log(bookTitles);
        this.api.setOutOfStock(bookTitles);
        this.route.navigate(['/']);
      });
    }
  }
}
