import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { __await } from 'tslib';
import { PostService } from '../post.service';
import { StoryService } from '../story.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  serverErrorMessages: string = 'false';
  storyImageBaseUrl = environment.storyBaseUrl;
  profileImageBaseUrl = environment.profileBaseUrl;
  postDetails ={
    email:'',
    name :'',
    text:''
  };


  imageExtention = environment.imgExt;
  
  profilePhoto:any;
  firstUserNameLetter:any;
  currentUserName:any;
  currentUserEmail:any;
  timeLinePosts:any;
  createStoryClicked = 0;
  imageFile: File | null = null;
  timeLineStories:any;
  userDetails: any;
 

  constructor(private userService: UserService, private router: Router, 
    private postService: PostService, private storyService:StoryService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  //getCurrentUserProfile
  getCurrentUser(){
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user'];
        this.currentUserEmail = this.userDetails.email;
        this.currentUserName = this.userDetails.name;
        this.firstUserNameLetter= this.userDetails.name[0];
        console.log(this.firstUserNameLetter)
        this.profilePhoto=this.profileImageBaseUrl+this.firstUserNameLetter+this.imageExtention;
        this.getPosts();
        this.getStories();
      },
      err => { 
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  //get all posts
  getPosts(){
    this.postService.getPosts(this.currentUserEmail).subscribe(
      (res:any) => {
        this.timeLinePosts = res;
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  
  //get all stories
  getStories(){
    this.storyService.getStories(this.currentUserEmail).subscribe(
      (res:any) =>{
        this.timeLineStories = res;
        //change story url 
        this.timeLineStories.forEach((story:any) => {
          story.storyUUID = this.storyImageBaseUrl+story.storyUUID;
        });
    },
    err => {
      this.serverErrorMessages = err.error.message;
    }
    );
  }

  UploadPost(){
    this.postDetails.email = this.currentUserEmail;
    this.postDetails.name = this.currentUserName;

    this.postService.savePost(this.postDetails).subscribe(
      (res:any) => {
        alert("Post Uploaded Successfuly!!!");
        this.getPosts();
        this.router.navigate(['/login']);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

  changeStoryClicked(){
    this.createStoryClicked = 1;
  }


  uploadStory(event: any) {
    this.createStoryClicked = 0;
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      var imageDetails = new FormData();
      imageDetails.append('files', this.imageFile, this.imageFile.name);
      imageDetails.append('email', this.currentUserEmail);
      imageDetails.append('name', this.currentUserName);


      this.storyService.uploadStory(imageDetails).subscribe(
        (res:any) => {
        if(res) { alert("Story Posted Successfully");this.getStories();}
      },err=>{
        this.serverErrorMessages = err.error.message;
      })
    }
  
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
