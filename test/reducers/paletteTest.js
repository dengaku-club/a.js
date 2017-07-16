import reducer from 'reducers/palette';
import { CHANGE_COLOR, CHANGE_WIDTH } from 'actions/const';
import config from 'config';

describe('palette', () => {
  it('should return the initial state', () => {
    expect(reducer(void 0, { })).to.deep.equal({
      color: config.defaultColor,
      width: config.defaultWidth
    });
  });
  it('should handle CHANGE_COLOR', () => {
    const color = '#010101';
    expect(reducer(void 0, {
      type: CHANGE_COLOR,
      color
    })).to.have.property('color', color);
  });
  it('should handle CHANGE_WIDTH', () => {
    const width = 40;
    expect(reducer(void 0, {
      type: CHANGE_WIDTH,
      width
    })).to.have.property('width', width);
  });
});
