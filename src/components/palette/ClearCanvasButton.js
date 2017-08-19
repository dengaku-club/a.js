import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import { getFrameById } from '@utils/frame';
import allInOne from '@utils/allInOne';

const props = {
  'canvas.frames': PropTypes.array.isRequired,
  'canvas.currentId': PropTypes.number.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['clearCanvas'];

class ClearCanvasButton extends Component {
  isDisabled() {
    return this.props.isPlaying ||
      getFrameById(this.props.frames, this.props.currentId).lines.length === 0;
  }
  render() {
    return (
      <PaletteButton
        caption="clear-canvas"
        disabled={this.isDisabled()}
        onClick={this.props.actions.clearCanvas} />
    );
  }
}
ClearCanvasButton.displayName = 'ClearCanvasButton';

export default allInOne(ClearCanvasButton, null, props, actions);
