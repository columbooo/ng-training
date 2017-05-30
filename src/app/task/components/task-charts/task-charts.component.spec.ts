import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChartsComponent } from './task-charts.component';

describe('TaskChartsComponent', () => {
  let component: TaskChartsComponent;
  let fixture: ComponentFixture<TaskChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
