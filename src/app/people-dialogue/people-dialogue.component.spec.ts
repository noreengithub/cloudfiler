import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDialogueComponent } from './people-dialogue.component';

describe('PeopleDialogueComponent', () => {
  let component: PeopleDialogueComponent;
  let fixture: ComponentFixture<PeopleDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
