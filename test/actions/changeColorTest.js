import action from 'actions/changeColor';
import { CHANGE_COLOR } from 'actions/const';

describe('changeColor', () => {
  it('should create an action to change the color', () => {
    const color = '#010101';
    expect(action(color)).to.deep.equal({
      type: CHANGE_COLOR,
      color
    });
  });
});