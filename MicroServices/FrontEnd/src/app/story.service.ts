import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http:HttpClient) { }

  uploadStory(postDetails:any){
    return this.http.post(environment.storyService+'story/story/',postDetails);
  }
  
  getStories(currentUser:any){
    return this.http.get(environment.storyService+'story/story/'+currentUser);
  }
}
