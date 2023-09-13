import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from 'src/app/DialogueBox/dashboard/dashboard.component';
import { GameServiceService } from 'src/app/Service/game-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(public dialog: MatDialog, private svc : GameServiceService) {}

  userProfile!: any
  image!:any
  jwtString = localStorage.getItem("jwt");
  usernameFromJwt!: string
  userData!: any

  ngOnInit(): void {
    if (this.jwtString) {
    this.image = "assets/profilepic.png"
    try {
      const jwtParts = this.jwtString.split('.')
      if (jwtParts.length === 3) {
        this.userProfile = JSON.parse(atob(jwtParts[1]))

      }
    } catch (error) {
      console.error("Error parsing JWT Payload:", error)
    }

    } else {

      this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "")
      this.image = this.userProfile.picture
    }
    const jwtParts = this.jwtString.split('.');
    const payload = JSON.parse(atob(jwtParts[1]))
    this.usernameFromJwt = payload.sub
    this.getUserHighScore(this.usernameFromJwt)

  }

  getUserHighScore(username: string) {

      this.svc.getUserScore(username).then(data => {
        console.log(data)
        this.userData = data
        console.log(this.userData.mathScore)
      })

  }
  openUserProfileDialog(): void {
    this.dialog.open(DashboardComponent, {
      data: { userProfile: this.userProfile, image: this.image, mathScore: this.userData.mathScore },
      width: '400px', // Set the width as per your preference
      height: '650px', // Set the height as per your preference
    })
  }
}
