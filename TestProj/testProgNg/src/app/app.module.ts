import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGameComponent } from './Component/main-game/main-game.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalWindowComponent } from './Component/modal-window/modal-window.component'
import { GameServiceService } from './Service/game-service.service';
import {MatDialogModule } from '@angular/material/dialog';
import { HomepageComponent } from './Component/homepage/homepage.component';
import { ShepherdService } from './Service/shepherd-service.service';

import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserCardComponent } from './Component/user-card/user-card.component';


const appRoutes : Routes = [
  {path: "", component:HomeComponent, title:"Homepage"},
  {path: "modes", component:HomepageComponent, title:"Game Modes"},
  {path: "math", component:MainGameComponent, title:"Math Game"}
  // {path: "comments", component: CommentsComponent, title: "Your Comment"}
]

@NgModule({
  declarations: [
    AppComponent,
    MainGameComponent,
    ModalWindowComponent,
    HomepageComponent,
    LoginComponent,
    HomeComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule

    // TourMatMenuModule.forRoot()
  ],
  providers: [GameServiceService, ShepherdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
