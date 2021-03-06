import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class PostService {
  posts: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.posts = database.list('posts');
    // likes = database.list['likes'];
  }

  getPost() {
    return this.posts;
  }

  addPost(newPost: Post) {
    this.posts.push(newPost);
  }

  getPostbyId(postId: string) {
    return this.database.object('posts/' + postId);
  }

  updatePost(localUpdatedPost) {
    const postEntryInFirebase = this.getPostbyId(localUpdatedPost.$key);
    postEntryInFirebase.update({
      idCount: localUpdatedPost.idCount,
      description: localUpdatedPost.description,
      feeling: localUpdatedPost.feeling,
    });
  }
  deletePost(localPostToDelete) {
    const postEntryInFirebase = this.getPostbyId(localPostToDelete.$key);
    postEntryInFirebase.remove();
  }
}
