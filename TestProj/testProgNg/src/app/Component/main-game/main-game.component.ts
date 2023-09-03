import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GameServiceService } from 'src/app/Service/game-service.service';
import { QuestionResponse } from 'src/app/game.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainGameComponent implements OnInit {
  // question!: any
  // userAnswer!: number | undefined
  // message: string | undefined
  showQuestion = false
  question!: QuestionResponse
  form!: FormGroup
  score = 0
  localQuestion : any

  constructor(private svc: GameServiceService, private fb: FormBuilder, private dialog: MatDialog, private location: Location){}

  ngOnInit(): void {
    this.location.replaceState('/');
    this.form = this.fb.group({
      answer: this.fb.control<number>( 0 ,[Validators.required])
    })

     // Retrieve the score from localStorage or initialize it to 0
    const storedScore = localStorage.getItem('score')
    const storedQuestion = localStorage.getItem('question')
    this.score = storedScore ? parseInt(storedScore) : 0

    if (storedQuestion) {
      this.question = JSON.parse(storedQuestion);
    } else {
      // If there's no question in local storage, fetch a new one
      this.showQuestion = true;
      this.getNewQuestion();
    }


    // this.showQuestion = true
    // this.getNewQuestion()
    console.log("model >>>>>>", this.question)
  }

  async getNewQuestion(): Promise<void>{
    try {
      this.question = await this.svc.getQuestion() as QuestionResponse
      localStorage.setItem('question', JSON.stringify(this.question));
      console.log("received >>>>>", this.question)
      this.form.reset()

      if (this.score >= 10) {
        this.openExperienceModal(this.score * 10);
        return; // Stop the game when the score reaches 10
      }

    } catch (error) {
    console.error("fetching error >>>>>", error)
  }
  }

  openExperienceModal(experiencePoints: number): void {
    this.dialog.open(ModalWindowComponent, {
      data: { experiencePoints },
    });
  }


  checkAnswer(): void {
    if (this.form.valid) {
      const submittedAnswer = this.form.get('answer')?.value;
      if (submittedAnswer === this.question.answer) {
        this.question.message = 'Correct!';
        this.score++
        localStorage.setItem('score', this.score.toString()); // Store the updated score in localStorage
        this.getNewQuestion()
      } else {
        this.question.message = 'Incorrect. Try again.';
      }
    } else {
      this.question.message = 'Please enter a valid answer.';
    }
  }


}
