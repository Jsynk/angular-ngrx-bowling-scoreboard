import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { provideStore } from '@ngrx/store';
import { BowlingComponent } from './bowling/bowling.component';

import { bowlingGamesReducer } from "./state/bowling/bowling.reducer";

@NgModule({
  declarations: [
    AppComponent,
    BowlingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ provideStore({ bowlingGames: bowlingGamesReducer }) ],
  bootstrap: [AppComponent]
})
export class AppModule { }
