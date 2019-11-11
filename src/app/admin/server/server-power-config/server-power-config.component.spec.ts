import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPowerConfigComponent } from './server-power-config.component';

describe('ServerPowerConfigComponent', () => {
  let component: ServerPowerConfigComponent;
  let fixture: ComponentFixture<ServerPowerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerPowerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPowerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
