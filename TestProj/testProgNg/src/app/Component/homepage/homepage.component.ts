import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router : Router) {}
  resetLocalStorageScore(): void {
    // Set the local storage score to 0
    localStorage.setItem('score', '0');
  }

  userProfile!: any

  ngOnInit(): void {
      this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "")
  }

  handleSignOut() {
    sessionStorage.removeItem("loggedInUser")
    this.router.navigate(['/']).then(()=> {
      window.location.reload()
      
    })
  }
}
