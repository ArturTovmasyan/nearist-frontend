import { BoardLaneMatrixModule } from './board-lane-matrix.module';

describe('BoardLaneMatrixModule', () => {
  let boardLaneMatrixModule: BoardLaneMatrixModule;

  beforeEach(() => {
      boardLaneMatrixModule = new BoardLaneMatrixModule();
  });

  it('should create an instance', () => {
    expect(boardLaneMatrixModule).toBeTruthy();
  });
});
