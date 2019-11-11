import { LogoutModule } from './logout.module';

describe('LogoutModuleModule', () => {
  let logoutModule: LogoutModule;

  beforeEach(() => {
      logoutModule = new LogoutModule();
  });

  it('should create an instance', () => {
    expect(logoutModule).toBeTruthy();
  });
});
