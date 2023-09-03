import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionResponse } from '../game.model';
import {  firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http : HttpClient) { }

  getQuestion() : Promise<QuestionResponse>{
    return firstValueFrom(this.http.get<QuestionResponse>("/api/question"))

  }
}
