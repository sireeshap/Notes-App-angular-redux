import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Notes, model } from '../store/note-type';
import { Observable } from 'rxjs';
import { NavbarService } from '../services/nav-bar.service';
import { NgRedux } from '@angular-redux/store';
import { NotesAppState } from '../store/store';
import { ViewEngineService } from '../services/view-engine.service';
@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.scss']
})
export class NotesNavbarComponent implements OnInit {
  @select() notesList: Observable<Notes>;
  @select() lastupdated;
  counter: any = 0;
  notesArray: any=[];
  selectedIndex: Number = 0;
  deletionIndex: any = null;
  currentNote: any = {
    id: 0
  }
  constructor(public navService: NavbarService, private ngRedux: NgRedux<NotesAppState>, private viewEngineService: ViewEngineService) {
  }
  ngOnInit() {
    /*get data from store and will push to navbar*/
  this.ngRedux.subscribe(() => {
      let arrayData = this.ngRedux.getState().notesList;
      if (arrayData.length == 0) {
        this.navService.disableAddNote = false;
      }

      /*this will perform  next item activation based on deleted  item index*/
      this.navService.getDeletionItem().subscribe(item => {
        this.deletionIndex = item;
      })
      if (arrayData && arrayData.length > 0) {
        this.notesArray = arrayData;
        if (this.deletionIndex != null) {
          if (1 <= this.deletionIndex && this.deletionIndex <= this.notesArray.length) {
            this.deletionIndex = this.deletionIndex - 1;
          }
          else if (this.deletionIndex < 1 && this.deletionIndex <= this.notesArray.length) {
            this.deletionIndex = this.deletionIndex;
          }
          this.navService.setActiveItem(arrayData[this.deletionIndex]);
        }
        else {
          this.navService.setActiveItem(arrayData[arrayData.length - 1]);
        }
      }
      else {
        /*Exceuted for first time fresh load of notesApp*/
        this.notesList.subscribe(data => {
          this.notesArray = data;
          this.navService.setActiveItem(this.notesArray[this.notesArray.length - 1]);
        })
      }
    })
    /*This will get current active item to be set and will push to navbar*/
    this.navService.getActiveItem().subscribe(item => {
      if (item['id'] != undefined)
        this.currentNote.id = item.id;
      if (this.checkPermissions(item, this.notesArray) === true) {
        this.notesArray.push(item)
      }
    })
  }
  /*this check will restrict  new note adding if restored notes having any new note*/
  checkPermissions(item, arrayList): boolean {
    if (typeof item === 'object' && Object.keys(item).length > 0 && item.firsttime && this.navService.veryNew === true) {
      return !(arrayList.filter(obj => obj.id === item.id).length > 0)
    }
    return false
  }
  clikedNote(item, i) {
    this.selectedIndex = i;
    this.navService.setActiveItem(item);
  }
  ngOnDestroy(): void {
  }
}
