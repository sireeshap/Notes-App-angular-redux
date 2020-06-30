import { Notes } from './note-type';
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from '../actions/actions';
export interface NotesAppState {
  notesList: Notes[];
}
export const INITIAL_STATE: NotesAppState = {
  notesList: []
};
export function rootReducer(state: NotesAppState, action): NotesAppState {
  switch (action.type) {
    case ADD_NOTE:
      let newItem: any = state.notesList.filter(item => item.firsttime == true)
      if (newItem.length > 0) {
        state.notesList = state.notesList.splice(0, state.notesList.indexOf(newItem))
      }
      action.note.id = state.notesList.length + 1;
      state = Object.assign({}, state, {
        notesList: state.notesList.concat(Object.assign({}, action.note))
      })
      //if (state.notesList.length > 0)
        //localStorage.setItem('NotesApp', JSON.stringify(state))
      return state

    case DELETE_NOTE:
      state = Object.assign({}, state, {
        notesList: state.notesList.filter(t => t.id != action.note.id)
      })
      if (state.notesList.length > 0)
        localStorage.setItem('NotesApp', JSON.stringify(state))
      return state
    case UPDATE_NOTE:
      state.notesList.map((item, index) => {
        if (item.id == action.note.id) {
          state.notesList[index] = { ...state.notesList[index], ...action.note }
        }
      })
      if (state.notesList.length > 0)
        localStorage.setItem('NotesApp', JSON.stringify(state))
      return state
  }
  return state;
}
