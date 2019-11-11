import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLaneMatrixComponent } from './board-lane-matrix.component';

describe('BoardLaneMatrixComponent', () => {
  let component: BoardLaneMatrixComponent;
  let fixture: ComponentFixture<BoardLaneMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardLaneMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLaneMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
