import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  savePost(postDetails:any){
    return this.http.post(environment.apiBaseUrl+'/savePost',postDetails);
  }

  getPosts(currentUser:any){
    return this.http.get(environment.apiBaseUrl+'/getPosts/'+currentUser);
  }
}
