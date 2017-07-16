import action from 'actions/changeWidth';
import { CHANGE_WIDTH } from 'actions/const';

describe('changeWidth', () => {
  it('should create an action to change the width', () => {
    const lineWidth = 40;
    expect(action(lineWidth)).to.deep.equal({
      type: CHANGE_WIDTH,
      width: lineWidth
    });
  });
});