import React from 'react';
import PropTypes from 'prop-types';
import allInOne from '@utils/allInOne';
import { getFrameById } from '@utils/frame';
import styles from '@components/prevcanvas.cssmodule.styl';
import config from '@config';

const props = {
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired,
  'canvas.width': PropTypes.number.isRequired,
  'canvas.height': PropTypes.number.isRequired
};

class PrevCanvas extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }
  componentDidUpdate(prevProps) {
    // We also need to update when prevFrame is removed, moved.
    // So we watch frames.
    if (this.props.currentId !== prevProps.currentId || this.props.frames !== prevProps.frames) {
      const index =
        this.props.frames.indexOf(getFrameById(this.props.frames, this.props.currentId));
      this.clear();
      if (index > 0) {
        this.drawPrevFrame(index - 1);
      }
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawPrevFrame(index) {
    const lines = this.props.frames[index].lines;
    this.ctx.strokeStyle = config.prevFrameColor;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    for (const line of lines) {
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
  render() {
    return (
      <canvas
        styleName="prev-canvas"
        width={this.props.width}
        height={this.props.height}
        ref={element => { this.canvas = element; }} />
    );
  }
}

export default allInOne(PrevCanvas, styles, props);
