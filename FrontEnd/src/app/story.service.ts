import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http:HttpClient) { }

  uploadStory(postDetails:any){
    return this.http.post(environment.apiBaseUrl+'/saveStory',postDetails);
  }
  
  getStories(currentUser:any){
    return this.http.get(environment.apiBaseUrl+'/getStories/'+currentUser);
  }
}
