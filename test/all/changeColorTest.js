import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Pen from 'components/Pen';
import App from 'containers/App';
import configureStore from 'stores';
import action from 'actions/changeColor';
import { CHANGE_COLOR } from 'actions/const';
import reducer from 'reducers/palette';

describe('changeColor', () => {
  describe('all', () => {
    let app;
    const color = '#795548';
    beforeEach(() => {
      app = mount(
        <Provider store={configureStore()}>
          <App />
        </Provider>
      );
    });
    it('the canvas should change color when a pen is clicked', () => {
      const canvas = app.find('Canvas');
      const pen = app.find('Pen').filterWhere(n => n.prop('color') === color);
      expect(canvas.node.ctx.strokeStyle).to.not.equal(color);
      pen.simulate('mousedown');
      canvas.node.penDown({ clientX: 0, clientY: 0 });
      expect(canvas.node.ctx.strokeStyle).to.equal(color);
    });
    it('the pen should become active when the pen is clicked', () => {
      const pen = app.find('Pen').filterWhere(n => n.prop('color') === color);
      expect(pen.node.state.styleName).to.not.have.include('pen-active');
      pen.simulate('mousedown');
      expect(pen.node.state.styleName).to.have.include('pen-active');
    });
  });
  it('the action should be created when a pen is clicked', () => {
    let color = '#010101';
    let currentColor = '#020202';
    let onChangeColor = sinon.spy();
    let pen = shallow(
      <Pen
        color={color}
        currentColor={currentColor}
        onChangeColor={onChangeColor} />
    );
    pen.simulate('mousedown');
    expect(onChangeColor.withArgs(color).calledOnce).to.equal(true);
  });
  it('should create an action to change the color', () => {
    const color = '#010101';
    expect(action(color)).to.deep.equal({
      type: CHANGE_COLOR,
      color
    });
  });
  it('should handle CHANGE_COLOR', () => {
    const color = '#010101';
    expect(reducer(void 0, {
      type: CHANGE_COLOR,
      color
    })).to.have.property('color', color);
  });
});