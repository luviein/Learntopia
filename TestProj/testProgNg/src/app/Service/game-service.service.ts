import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HighScores, QuestionResponse } from '../game.model';
import {  first, firstValueFrom } from 'rxjs';
// import { List } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http : HttpClient) { }



  getQuestion() : Promise<QuestionResponse>{
    return firstValueFrom(this.http.get<QuestionResponse>("/api/question"))

  }
  getHighScores() : Promise<any> {
    return firstValueFrom(this.http.get("/api/getScore"))
  }

  updateScore(userData: any): Promise<any>{
    return firstValueFrom(this.http.put("/api/update-score", userData))
  }

  getUserScore(username:string): Promise<any> {
    return firstValueFrom(this.http.get(`/api/getScore/${username}`))
  }

  getDefinition(query:string): Promise<any> {
    const params = new HttpParams().set('q', query);
    
    return firstValueFrom(this.http.get("/api/search", { params: params }))
  } 


}
