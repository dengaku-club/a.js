import React from 'react';
import { shallow } from 'enzyme';
import {
  Palette as PaletteContainer,
  mapStateToProps,
  mapDispatchToProps
} from 'containers/Palette';
import Palette from 'components/Palette';

describe('containers/Palette', () => {
  describe('component', () => {
    const actions = {
      changeColor() {},
      changeWidth() {}
    };
    const palette = {};
    const component = shallow(<PaletteContainer actions={actions} palette={palette} />);
    expect(component.contains(<Palette actions={actions} palette={palette} />)).to.equal(true);
  });
  describe('#mapStateToProps', () => {
    it('should return only palette', () => {
      const palette = { color: 'red' };
      expect(mapStateToProps({
        palette,
        other: {}
      })).to.deep.equal({ palette });
    });
  });
  describe('#mapDispatchToProps', () => {
    it('should return actions', () => {
      expect(mapDispatchToProps({})).to.have.property('actions');
      expect(Object.keys(mapDispatchToProps({}).actions)).to.have.lengthOf(2);
    });
  });
});