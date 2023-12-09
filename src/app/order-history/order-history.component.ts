import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
  history: any;
  userId: any;

  constructor(private api: ApiService, private auth: AuthService) {
    this.auth.getUser().then((user) => { this.userId = user.id; })
    api.getOrderHistory(this.userId).subscribe((response) => {
      this.history = response;
      console.log(this.history);
    });
  }
}
