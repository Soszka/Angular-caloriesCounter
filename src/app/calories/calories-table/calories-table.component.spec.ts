import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesTableComponent } from './calories-table.component';

describe('CaloriesTableComponent', () => {
  let component: CaloriesTableComponent;
  let fixture: ComponentFixture<CaloriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
