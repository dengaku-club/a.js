import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/canvas.cssmodule.styl';
import { getFrameById } from '@utils/frame';
import allInOne from '@utils/allInOne';

// 'currentId' prop is used as prevProp,
// but eslint gives the error.
// eslint-disable react/no-unused-prop-types

const props = {
  'palette.color': PropTypes.string.isRequired,
  'palette.lineWidth': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired,
  'canvas.history': PropTypes.array.isRequired,
  'canvas.isUpdateThumbnailNeeded': PropTypes.bool.isRequired,
  'canvas.width': PropTypes.number.isRequired,
  'canvas.height': PropTypes.number.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['addLine', 'updateThumbnail', 'changeSize'];

class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.updateCanvasSize);
    this.ctx = this.canvas.getContext('2d');
    this.positions = {};
  }
  componentDidUpdate(prevProps) {
    if (this.props.isUpdateThumbnailNeeded) {
      this.props.actions.updateThumbnail(prevProps.currentId, this.canvas.toDataURL('image/png'));
    }
    if (this.props.history.length < prevProps.history.length ||
        this.getLines() < getFrameById(prevProps.frames, prevProps.currentId).lines ||
        this.props.currentId !== prevProps.currentId) {
      this.updateCanvas();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize);
  }
  getStyle() {
    return {
      display: this.props.isPlaying ? 'none' : 'block'
    };
  }
  getLines() {
    return getFrameById(this.props.frames, this.props.currentId).lines;
  }
  pushPosition(id, x, y) {
    if (typeof this.positions[id] === 'undefined') {
      this.positions[id] = [];
    }
    this.positions[id].push({ x, y });
  }
  updateCanvas() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
    for (const line of this.getLines()) {
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = line.lineWidth;
      this.ctx.beginPath();
      if (line.position.length === 1) {
        const { x, y } = line.position[0];
        this.ctx.arc(x, y, 0.8, 0, 360);
      } else {
        for (const index in line.position) {
          const { x, y } = line.position[index];
          if (index === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
      }
      this.ctx.stroke();
    }
  }
  updateCanvasSize = () => {
    this.props.actions.changeSize(0, 0);
    this.props.actions.changeSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }
  mouseDown = event => {
    if (this.props.isPlaying) return;
    this.canvas.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
    this.penDown(-1, event.clientX, event.clientY);
  }
  touchStart = event => {
    if (this.props.isPlaying) return;
    if (event.touches.length === 1) {
      this.canvas.addEventListener('touchmove', this.touchMove);
      window.addEventListener('touchend', this.touchEnd);
    }
    const touch = event.changedTouches[0];
    this.penDown(touch.identifier, touch.clientX, touch.clientY);
  }
  penDown(id, _x, _y) {
    const [x, y] = [_x - this.canvas.offsetLeft, _y - this.canvas.offsetTop];
    this.pushPosition(id, x, y);
    this.ctx.strokeStyle = this.props.color;
    this.ctx.lineWidth = this.props.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();
    this.ctx.arc(x, y, 0.8, 0, 360);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  mouseMove = event => {
    this.penMove(-1, event.clientX, event.clientY);
  }
  touchMove = event => {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      this.penMove(touch.identifier, touch.clientX, touch.clientY);
    }
  }
  penMove(id, _x, _y) {
    const [x, y] = [_x - this.canvas.offsetLeft, _y - this.canvas.offsetTop];
    this.pushPosition(id, x, y);
    const positions = this.positions[id];
    this.ctx.beginPath();
    if (positions.length >= 2) {
      const pos = positions[positions.length - 2];
      this.ctx.moveTo(pos.x, pos.y);
    } else {
      this.ctx.moveTo(x, y);
    }
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  mouseUp = () => {
    this.canvas.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
    this.penUp(-1);
  }
  touchEnd = event => {
    if (event.touches.length === 0) {
      this.canvas.removeEventListener('touchmove', this.touchMove);
      window.removeEventListener('touchend', this.touchEnd);
    }
    this.penUp(event.changedTouches[0].identifier);
  }
  penUp(id) {
    this.props.actions.addLine(this.positions[id], this.props.color, this.props.lineWidth);
    delete this.positions[id];
  }
  render() {
    return (
      <canvas
        id="canvas"
        styleName="canvas"
        ref={element => { this.canvas = element; }}
        width={this.props.width}
        height={this.props.height}
        style={this.getStyle()}
        onMouseDown={this.mouseDown}
        onTouchStart={this.touchStart} />
    );
  }
}

Canvas.displayName = 'Canvas';
Canvas.defaultProps = {};

export default allInOne(Canvas, styles, props, actions);
