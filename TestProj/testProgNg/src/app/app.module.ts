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

const appRoutes : Routes = [
  {path: "", component:HomepageComponent, title:"Homepage"},
  {path: "math", component:MainGameComponent, title:"Math Game"},
  // {path:"herolist", component: HeroListComponent},
  // {path: "herolist/:id", component: HeroComponent},
  // {path: "comments", component: CommentsComponent, title: "Your Comment"}
]

@NgModule({
  declarations: [
    AppComponent,
    MainGameComponent,
    ModalWindowComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MatDialogModule
  ],
  providers: [GameServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
