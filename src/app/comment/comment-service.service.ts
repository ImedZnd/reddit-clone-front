import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  getAllCommentsByUser(name: string) : Observable<CommentPayload[]>{
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-user/' + name);
  }

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload[]> {
    return this.httpClient.post<CommentPayload[]>('http://localhost:8080/api/comments/', commentPayload);
  }
}