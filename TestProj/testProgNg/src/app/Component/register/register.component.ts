import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RegistrationComponent } from 'src/app/DialogueBox/registration/registration.component';
import { HomepageService } from 'src/app/Service/homepage-service.service';
import { RegisterDetails } from 'src/app/game.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private registerSvc : HomepageService, private dialog: MatDialog) {}

  form!: FormGroup;
  register!: RegisterDetails;
  sub$!: Subscription
  emailSub$!: Subscription

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      passw: ['', Validators.required]
    });
  }

  process() {
    if (this.form.valid) {
      // Process and handle login form submission
      this.register = this.form.value;
      this.sub$ = this.registerSvc.registerJwt(this.register).subscribe(data=>{
        localStorage.setItem("jwt", data.token)
      })
      this.emailSub$ = this.registerSvc.sendEmail(this.register).subscribe(data=>{
        console.log(data)
      })
      this.openSuccessDialog();
    }
  }

  openSuccessDialog() {
    this.dialog.open(RegistrationComponent, {
      width: '400px', // You can adjust the width as needed
      data: { message: 'Remember to check your email!' }
    });

  }
}
