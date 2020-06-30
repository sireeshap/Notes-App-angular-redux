import { Component, OnInit, } from '@angular/core';
import { ADD_NOTE, DELETE_NOTE } from '../actions/actions';
import { NavbarService } from '../services/nav-bar.service';
import { model } from '../store/note-type';
import { NgRedux } from '@angular-redux/store';
import { NotesAppState } from '../store/store';
import { ViewEngineService } from '../services/view-engine.service';
import { Subject } from 'rxjs'
@Component({
  selector: 'app-notes-topbar',
  templateUrl: './notes-topbar.component.html',
  styleUrls: ['./notes-topbar.component.scss']
})
export class NotesTopbarComponent implements OnInit {
  private delete: any;
  constructor(private ngRedux: NgRedux<NotesAppState>, public navService: NavbarService, private viewEngineService: ViewEngineService) { }
  ngOnInit() {
    this.navService.getActiveItem().subscribe(item => {
      this.delete = item
    })
  }
  addNotes() {
    this.navService.toggleVeryNew();
    this.ngRedux.dispatch({ type: ADD_NOTE, note: model });
    this.navService.disableAddNote = true;
    this.navService.disableDeleteNote = true;
    this.navService.setActiveItem(model);
  }
  deleteNotes() {
    let beforeState = this.ngRedux.getState().notesList;
    this.navService.setDeletionItem(beforeState.indexOf(this.delete))
    this.ngRedux.dispatch({ type: DELETE_NOTE, note: this.delete });

  }
}
