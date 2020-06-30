import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ViewEngineService {
  viewItem = new EventEmitter<any>();
  constructor() { }
  public setViewItem(item): void {
    this.viewItem.emit(item)
  }
}
