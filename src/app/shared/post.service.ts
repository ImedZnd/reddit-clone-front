import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../model/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPosts():Observable<Array<PostModel>>{
    return this.http.get<Array<PostModel>>('http//localhost:8080/api/posts/');
  }
}
