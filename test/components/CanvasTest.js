import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Canvas from 'components/Canvas.js';

describe('<Canvas />', function () {
  let testColor;
  let testWidth;

  let component;
  beforeEach(function () {
    testColor = 'red';
    testWidth = 20;
    component = mount(<Canvas color={testColor} width={testWidth} />);
  });

  describe('when rendering the component', function () {
    it('should have a canvas', function () {
      expect(component.find('canvas')).to.have.length(1);
    });
  });

  describe('#getPosition', function () {
    const clientX = 10;
    const clientY = 20;
    it('should return when clientX and clientY', function () {
      expect(component.instance().getPosition({
        clientX, clientY
      })).to.deep.equal({
        x: clientX,
        y: clientY
      });
    });
    it('should return when touches', function () {
      expect(component.instance().getPosition({
        touches: [{
          clientX, clientY
        }]
      })).to.deep.equal({
        x: clientX,
        y: clientY
      });
    });
  });

  describe('#pushPosition', function () {
    it('should push position to positions', function () {
      const pos = { x: 10, y: 20 };
      component.instance().pushPosition(pos.x, pos.y);
      expect(component.instance().positions).to.have.length(1);
      expect(component.instance().positions[0]).to.deep.equal(pos);
    });
  });

  describe('#penDown', function () {
    it('should change strokeStyle', function () {
      const color = '#008000';
      component.setProps({ color });
      component.instance().penDown({
        clientX: 0,
        clientY: 0
      });
      expect(component.instance().ctx.strokeStyle).to.equal(color);
    });
    it('should change lineWidth', function () {
      const width = 200;
      component.setProps({ width });
      component.instance().penDown({
        clientX: 0,
        clientY: 0
      });
      expect(component.instance().ctx.lineWidth).to.equal(width);
    });
    it('should set isDownPen to true', function () {
      component.instance().penDown({
        clientX: 0,
        clientY: 0
      });
      expect(component.instance().isDownPen).to.equal(true);
    });
    it('should update ctx settings', function () {
      component.instance().penDown({
        clientX: 0,
        clientY: 0
      });
      expect(component.instance().ctx.lineCap).to.equal('round');
      expect(component.instance().ctx.lineJoin).to.equal('round');
    });
  });

  describe('#penMove', function () {
    it('should draw a line', function () {
      const lineToSpy = sinon.spy(component.instance().ctx, 'lineTo');
      const x = 20;
      const y = 30;
      component.instance().isDownPen = true;
      component.instance().penMove({
        clientX: x,
        clientY: y
      });
      expect(lineToSpy.withArgs(x, y).calledOnce).to.equal(true);
      lineToSpy.restore();
    });
  });

  describe('#penUp', function () {
    it('should set isDownPen to false', function () {
      component.instance().isDownPen = true;
      component.instance().penUp();
      expect(component.instance().isDownPen).to.equal(false);
    });
    it('should clear positions', function () {
      component.instance().positions = [{ x: 100, y: 100 }];
      component.instance().penUp();
      expect(component.instance().positions).to.have.length(0);
    });
  });

  // check overall flow

  describe('mousedown', function () {
    it('should change strokeStyle', function () {
      const color = '#010101';
      component.setProps({ color });
      component.simulate('mousedown', {
        clientX: 100,
        clientY: 100
      });
      expect(component.instance().ctx.strokeStyle).to.equal(color);
    });
  });

  describe('touchstart', function () {
    it('should change strokeStyle', function () {
      const color = '#010101';
      component.setProps({ color });
      component.simulate('touchstart', {
        touches: [{
          clientX: 100,
          clientY: 100
        }]
      });
      expect(component.instance().ctx.strokeStyle).to.equal(color);
    });
  });

  describe('mousemove', function () {
    it('should call lineTo', function () {
      const x = 100;
      const y = 200;
      const lineToSpy = sinon.spy(component.instance().ctx, 'lineTo');
      component.instance().isDownPen = true;
      component.simulate('mousemove', {
        clientX: x, clientY: y
      });
      expect(lineToSpy.withArgs(x, y).calledOnce).to.equal(true);
    });
  });

  describe('touchmove', function () {
    it('should call lineTo', function () {
      const x = 100;
      const y = 200;
      const lineToSpy = sinon.spy(component.instance().ctx, 'lineTo');
      component.instance().isDownPen = true;
      component.simulate('touchmove', {
        touches: [{
          clientX: x, clientY: y
        }]
      });
      expect(lineToSpy.withArgs(x, y).calledOnce).to.equal(true);
    });
  });

  describe('mouseup', function () {
    it('should set isDownPen to false', function () {
      component.instance().isDownPen = true;
      component.simulate('mouseup');
      expect(component.instance().isDownPen).to.equal(false);
    });
  });

  describe('touchend', function () {
    it('should set isDownPen to false', function () {
      component.instance().isDownPen = true;
      component.simulate('touchend');
      expect(component.instance().isDownPen).to.equal(false);
    });
  });
});
