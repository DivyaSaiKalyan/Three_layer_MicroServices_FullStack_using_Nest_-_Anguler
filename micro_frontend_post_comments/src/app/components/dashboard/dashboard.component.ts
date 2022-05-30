import { CommentsT } from './../../interfaces/comments.types';
import { CommentsService } from './../../services/comments.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createPostT } from './../../interfaces/createPost.types';
import { CreatePostService } from './../../services/create-post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  commentsForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  getAllPosts: createPostT[] = [];
  allComments: CommentsT[] = [];
  likes!: createPostT;
  constructor(
    private createPostService: CreatePostService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.createPostService
      .getPost()
      .subscribe((posts) => (this.getAllPosts = posts));
    this.getAllComments();
  }

  incLike(post: createPostT) {
    this.createPostService
      .incressLike(post.id, post.likes + 1)
      .subscribe(() => this.ngOnInit());
    //window.location.reload();
    //this.ngOnInit();
  }

  async postComment(posts: createPostT) {
    const newComment: CommentsT = {
      postId: posts.id,

      comment: this.commentsForm.value.comment,
    };
    const cnfirmation = window.confirm(
      'are you sure do you want to post this comment'
    );
    if (cnfirmation === true) {
      const result = this.commentsService
        .postComment(newComment)
        .subscribe((comment) => this.allComments.push(comment));
      this.commentsForm.reset();
      return result;
    } else {
      return null;
    }
  }

  getAllComments() {
    this.commentsService
      .getAllComments()
      .subscribe((comments) => (this.allComments = comments));
  }

  createNewPost(postData: createPostT) {
    const newPostData: createPostT = {
      title: postData.title,
      url: postData.url,
      likes: 0,
      id: this.getAllPosts.length + 1,
    };
    const result = this.createPostService
      .createPost(postData)
      .subscribe((data: any) => {
        this.getAllPosts.push(data);
        alert('your post is succsfully created');
      });
    return result;
  }
}
