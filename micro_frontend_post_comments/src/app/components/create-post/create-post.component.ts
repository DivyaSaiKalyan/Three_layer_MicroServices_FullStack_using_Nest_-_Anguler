import { CreatePostService } from './../../services/create-post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { createPostT } from 'src/app/interfaces/createPost.types';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    url: new FormControl('', [Validators.required]),
  });

  @Output() newPost: EventEmitter<createPostT> = new EventEmitter();

  constructor(private readonly createPostService: CreatePostService) {}

  ngOnInit(): void {}

  get title() {
    return this.createPostForm.get('title');
  }

  get url() {
    return this.createPostForm.get('url');
  }

  button() {
    return this.createPostForm.invalid;
  }

  onCreatePost() {
    const result = this.newPost.emit(this.createPostForm.value);
    this.createPostForm.reset();
    return result;
    // const result = this.createPostService
    //   .createPost(this.createPostForm.value)
    //   .subscribe(() => alert('your post is succsfully created'));
    // this.createPostForm.reset();
    // return result;
  }
}
