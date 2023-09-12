import { HighScores } from './../../game.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameServiceService } from 'src/app/Service/game-service.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private svc: GameServiceService) {}

  highScoreList: HighScores[] = []

  resetLocalStorageScore(): void {
    // Set the local storage score to 0
    localStorage.setItem('score', '0');
  }

  userProfile!: any;
  jwtString = localStorage.getItem("jwt");

  async ngOnInit(): Promise<void> {
    if (this.jwtString) {
      try {
        const jwtParts = this.jwtString.split('.');
        if (jwtParts.length === 3) {
          this.userProfile = JSON.parse(atob(jwtParts[1]));
          // console.log("Decoded JWT Payload:", this.userProfile);
        }
      } catch (error) {
        console.error("Error parsing JWT Payload:", error);
      }
    } else {
      this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    }

    const result = await this.svc.getHighScores()
    this.highScoreList = result.map((jsonString: any) => {
      return JSON.parse(JSON.stringify(jsonString)) as HighScores;

     })

    console.log(this.highScoreList)

  }

  handleSignOut() {
    localStorage.removeItem("jwt")
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  addHighScore(score : any) {


  }
}
