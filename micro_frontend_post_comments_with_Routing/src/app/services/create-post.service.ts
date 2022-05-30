import { createPostT } from './../interfaces/createPost.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  constructor(private http: HttpClient) {}

  createPost(postData: createPostT): Observable<createPostT> {
    const createPostUrl = 'http://localhost:3002/posts/createpost';
    return this.http.post<createPostT>(createPostUrl, postData);
  }

  getPost(): Observable<createPostT[]> {
    const getPostUrl = 'http://localhost:3002/posts/getAllPosts';
    return this.http.get<createPostT[]>(getPostUrl);
  }

  incressLike(id: number, like: number) {
    const likeUrl = `http://localhost:3002/posts/addLike/${id}/${like}`;
    return this.http.put(likeUrl, null);
  }
}
