import React from 'react';
import { shallow } from 'enzyme';
import Palette from 'components/Palette.js';
import colors from 'constants/colors';

describe('<Palette />', function () {

  let component;
  const testActions = {
    changeWidth() {},
    changeColor() {}
  };
  const testPalette = {
    color: 'red',
    width: 30
  };
  beforeEach(function () {
    component = shallow(<Palette actions={testActions} palette={testPalette} />);
  });

  describe('when rendering the component', function () {
    it('should make colors of pens', function () {
      expect(component.find('Pen')).to.have.length(colors.length);
    });
    it('should have a <LineWidth />', function () {
      expect(component.find('LineWidth')).to.have.length(1);
    });
  });
});
