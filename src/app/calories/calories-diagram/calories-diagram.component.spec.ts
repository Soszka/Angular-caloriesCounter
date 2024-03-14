import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesDiagramComponent } from './calories-diagram.component';

describe('CaloriesDiagramComponent', () => {
  let component: CaloriesDiagramComponent;
  let fixture: ComponentFixture<CaloriesDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
