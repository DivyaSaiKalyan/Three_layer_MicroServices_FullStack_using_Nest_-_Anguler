import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommentsT } from '../interfaces/comments.types';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  postComment(comment: CommentsT): Observable<CommentsT> {
    const commentPostUrl = 'http://localhost:3002/posts/createComment';
    return this.http.post<CommentsT>(commentPostUrl, comment);
  }

  getAllComments(): Observable<CommentsT[]> {
    const commentsUrl = 'http://localhost:3009/comments/getcomments';
    return this.http.get<CommentsT[]>(commentsUrl);
  }
}
