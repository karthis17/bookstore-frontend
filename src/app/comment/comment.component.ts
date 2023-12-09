import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() id: any | string;
  comment = new FormControl('', Validators.required);
  comments: any;

  ngOnInit() {
    console.log("hii", this.id);
    this.api.getComments(this.id).subscribe(com => { this.comments = com });
  }

  constructor(private api: ApiService, private auth: AuthService) { }

  async submit() {
    if (this.comment.valid) {
      let name = await this.auth.getUser();
      this.api.sendComment(this.comment.value, this.id, name.name);
      console.log(this.comment.value);
      // window.location.reload();
      this.api.getComments(this.id).subscribe(com => { this.comments = com });
    }
  }

}
