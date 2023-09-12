import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomepageService } from 'src/app/Service/homepage-service.service';
import { LoginDetails } from 'src/app/game.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: HomepageService, private route : Router) {}

  form!: FormGroup;
  login!: LoginDetails;
  sub$!: Subscription

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  process() {
    if (this.form.valid) {
      this.login = this.form.value;
      console.log(this.login);
    }
    this.sub$ = this.authService.authenticate(this.login).subscribe({
      next: (data) => {
        if(data){
          console.log('Authentication successful', data);
          localStorage.setItem('jwt', data.token);
          this.route.navigate(['/modes']);
        }

      },
      error: (error) => {
        console.error('Authentication error: ', error);
      },
    });
  }


}
