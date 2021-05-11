import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  upvotePost(){

  }
  downvotePost(){

  }

}
