import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerLoadBitstreamComponent } from './server-load-bitstream.component';

describe('ServerPowerConfigComponent', () => {
  let component: ServerLoadBitstreamComponent;
  let fixture: ComponentFixture<ServerLoadBitstreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerLoadBitstreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerLoadBitstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
