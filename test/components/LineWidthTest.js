import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LineWidth from 'components/LineWidth.js';

describe('<LineWidth />', function () {

  let component;
  let testWidth;
  let testOnChangeWidth;
  beforeEach(function () {
    testWidth = 10;
    testOnChangeWidth = () => {};
    component = shallow(<LineWidth width={testWidth} onChangeWidth={testOnChangeWidth} />);
  });

  describe('when rendering the component', function () {
    it('should have an input', function () {
      expect(component.find('input')).to.have.length(1);
    });
    it('should set default value by width', function () {
      const width = 30;
      component.setProps({ width });
      expect(component.find('input').prop('defaultValue')).to.equal(width);
    });
  });

  describe('mouseup', function () {
    it('should call onChangeWidth with the value', function () {
      const onChangeWidth = sinon.spy();
      const value = '40';
      component.setProps({ onChangeWidth });
      component.find('input').simulate('mouseup', {
        target: { value }
      });
      expect(onChangeWidth.withArgs(parseInt(value)).calledOnce).to.equal(true);
    });
  });
});
