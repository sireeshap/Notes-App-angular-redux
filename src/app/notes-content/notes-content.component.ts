import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NotesAppState, rootReducer} from '../store/store';
import { model } from '../store/note-type';
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from '../actions/actions';
import { NavbarService } from '../services/nav-bar.service';
@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss']
})
export class NotesContentComponent implements OnInit, AfterViewInit {
  @ViewChild('editArea', { static: false }) inputElement: ElementRef;
  noteContent: any;
  autofocus: boolean = false;
  currentNote: Object = {};
  currentLatestNote: Object = {};
  constructor(private ngRedux: NgRedux<NotesAppState>, public navService: NavbarService,
    public element: ElementRef) {
  }

  ngOnInit() {
    /*Hear the editing area will display of selected notes and will perform editing*/
    this.ngRedux.dispatch({ type: ADD_NOTE, note: model });//add new note for first time load
    this.navService.disableAddNote = true; //disable addNote if new note avaiable already with out editing

    /*if any active item loaded*/
    this.navService.getActiveItem().subscribe(data => {
      if (typeof data === 'object' && Object.keys(data).length > 0) {
        this.currentNote = data;
        this.noteContent = data.content;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.currentNote['firsttime'] === true) {
      this.beFocus();
    }
    else {
      this.noteContent = this.currentNote['content']
    }
  }
  beFocus(): void {
    this.inputElement.nativeElement.focus()
  }
  onEditing() {
    this.currentLatestNote = {
      'content': this.noteContent,
      'firsttime': false,
      'title': this.assignTitle(this.noteContent),
      'subtitle': this.assignSubtitle(this.noteContent),
      'updated': Date.now()
    }
    this.navService.disableDeleteNote = false;
    this.currentNote = ({ ...this.currentNote, ...this.currentLatestNote });
    this.ngRedux.dispatch({ type: UPDATE_NOTE, note: this.currentNote });
    this.navService.disableAddNote = !(this.noteContent.length > 0);
    
  }
  assignSubtitle(content): string {
    if (content.length < 65) {
      return model['subtitle']
    }
    else {
      return this.noteContent.substring(66, this.noteContent.length)
    }
  }
  assignTitle(content): string {
    return (content.length > 0) ? content.substring(0, 65) : 'New Note'
  }
}

