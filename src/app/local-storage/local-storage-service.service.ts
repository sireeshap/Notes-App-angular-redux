import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }
  loadState = () => {
    try {
      const serializedState = localStorage.getItem('NotesApp');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('NotesApp', serializedState);
    } catch {
      // ignore write errors
    }
  };
}
