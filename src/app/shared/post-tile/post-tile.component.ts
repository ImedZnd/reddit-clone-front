import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from '../post.service';
import { faArrowUp, faArrowDown,faComments } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts: PostModel[];
  @Input() data: Array<PostModel>;

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }
  goToPost(id:number){
    this.router.navigateByUrl('/view-post/'+id);
  }
}
