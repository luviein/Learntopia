import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDetails } from 'src/app/game.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private ngZone: NgZone) {}

  form!: FormGroup;
  login!: LoginDetails;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  process() {
    if (this.form.valid) {
      // Process and handle login form submission
      console.log(this.form.value);
      this.login = this.form.value;
      console.log(this.login);
    }
  }


}
