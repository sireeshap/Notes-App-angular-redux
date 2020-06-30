import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { model } from '../store/note-type';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  hideSideNav: boolean = false;
  disableAddNote: boolean = false;
  disableDeleteNote: boolean = false;
  veryNew: boolean = false;
  activeItem: BehaviorSubject<any> = new BehaviorSubject<any>({});
  deletionItem: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }
  toggleVeryNew(): void {
    this.veryNew = !this.veryNew;
  }
  toggleAddNote(): void {
    this.disableAddNote = !this.disableAddNote
  }
  toggleDeleteNote(): void {
    this.disableDeleteNote = !this.disableDeleteNote
  }
  setActiveItem(item): void {
    this.activeItem.next(item);
  }
  getActiveItem() {
    return this.activeItem.asObservable()
  }
  setDeletionItem(item): void {
    this.deletionItem.next(item);
  }
  getDeletionItem() {
    return this.deletionItem.asObservable()
  }

}