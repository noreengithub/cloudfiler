import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoursettingsComponent } from './yoursettings.component';

describe('YoursettingsComponent', () => {
  let component: YoursettingsComponent;
  let fixture: ComponentFixture<YoursettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoursettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoursettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
