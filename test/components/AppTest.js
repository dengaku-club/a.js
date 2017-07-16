import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import Palette from 'containers/Palette';
import Canvas from 'components/Canvas';

describe('<App />', function () {
  const colorTest = 'red';
  const widthTest = 20;
  const paletteTest = {
    color: colorTest,
    width: widthTest
  };

  beforeEach(function () {
    this.component = shallow(<App palette={paletteTest} />);
  });

  describe('when rendering the component', function () {
    it('should have a className of "index"', function () {
      expect(this.component.hasClass('index')).to.equal(true);
    });
    it('should have a palette', function () {
      expect(this.component.contains(<Palette />)).to.equal(true);
    });
    it('should have a canvas', function () {
      expect(this.component.contains(
        <Canvas color={paletteTest.color} width={paletteTest.width} />
      )).to.equal(true);
    });
  });
});
