import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesAppComponent } from './notes-app/notes-app.component';


const routes: Routes = [
  {path: '', component:NotesAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
