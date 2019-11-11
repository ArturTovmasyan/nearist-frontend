import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureLogsComponent } from './log-list.component';

describe('TemperatureLogsComponent', () => {
  let component: TemperatureLogsComponent;
  let fixture: ComponentFixture<TemperatureLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
