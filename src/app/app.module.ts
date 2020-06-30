import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  NgReduxModule } from '@angular-redux/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { FormsModule } from '@angular/forms';
import { NotesNavbarComponent } from './notes-navbar/notes-navbar.component';
import { NotesTopbarComponent } from './notes-topbar/notes-topbar.component';
import { NotesContentComponent } from './notes-content/notes-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesAppComponent,
    NotesNavbarComponent,
    NotesTopbarComponent,
    NotesContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
