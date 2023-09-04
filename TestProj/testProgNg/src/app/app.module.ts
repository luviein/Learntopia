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
import { HighlightDirective } from './highlight.directive';
import { IntroJsHtmlComponent } from './Component/shepherd/intro-js-html.component';
import { ShepherdService } from './Service/shepherd-service.service';


const appRoutes : Routes = [
  {path: "", component:HomepageComponent, title:"Homepage"},
  {path: "math", component:MainGameComponent, title:"Math Game"},
  {path: "shepherd", component: IntroJsHtmlComponent},
  // {path: "comments", component: CommentsComponent, title: "Your Comment"}
]

@NgModule({
  declarations: [
    AppComponent,
    MainGameComponent,
    ModalWindowComponent,
    HomepageComponent,
    IntroJsHtmlComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MatDialogModule,
    // TourMatMenuModule.forRoot()
  ],
  providers: [GameServiceService, ShepherdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
