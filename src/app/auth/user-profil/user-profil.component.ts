import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentServiceService } from '../../comment/comment-service.service';
import { PostModel } from '../../model/post-model';
import { CommentPayload } from '../../comment/comment-payload';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})

export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentServiceService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

}