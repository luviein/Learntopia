import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  resetLocalStorageScore(): void {
    // Set the local storage score to 0
    localStorage.setItem('score', '0');
  }
}
