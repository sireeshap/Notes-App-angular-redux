import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { NotesAppState, rootReducer, INITIAL_STATE } from '../store/store';
import { LocalStorageServiceService } from '../local-storage/local-storage-service.service';
@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.scss']
})
export class NotesAppComponent implements OnInit, OnChanges {
  constructor(private ngRedux: NgRedux<NotesAppState>, private localStorageServiceService: LocalStorageServiceService) {
    let existingNotes: any = this.localStorageServiceService.loadState();
    if (existingNotes == undefined) {
      ngRedux.configureStore(rootReducer, INITIAL_STATE);
    }
    else {
      ngRedux.configureStore(rootReducer, existingNotes)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  ngOnInit() {
  }
}
