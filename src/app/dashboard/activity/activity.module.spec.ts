import { ActivityModule } from './activity.module';

describe('DocumentationModule', () => {
    let activityModule: ActivityModule;

    beforeEach(() => {
        activityModule = new ActivityModule();
    });

    it('should create an instance', () => {
        expect(ActivityModule).toBeTruthy();
    });
});
