import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourprivatesettingsComponent } from './yourprivatesettings.component';

describe('YourprivatesettingsComponent', () => {
  let component: YourprivatesettingsComponent;
  let fixture: ComponentFixture<YourprivatesettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourprivatesettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourprivatesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
