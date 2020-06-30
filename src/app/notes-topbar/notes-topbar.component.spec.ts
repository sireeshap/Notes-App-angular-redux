import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTopbarComponent } from './notes-topbar.component';

describe('NotesTopbarComponent', () => {
  let component: NotesTopbarComponent;
  let fixture: ComponentFixture<NotesTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
