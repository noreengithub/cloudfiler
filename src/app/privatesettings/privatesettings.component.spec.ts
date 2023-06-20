import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatesettingsComponent } from './privatesettings.component';

describe('PrivatesettingsComponent', () => {
  let component: PrivatesettingsComponent;
  let fixture: ComponentFixture<PrivatesettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatesettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
