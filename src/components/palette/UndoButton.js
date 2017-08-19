import React from 'react';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import allInOne from '@utils/allInOne';

const props = {
  'canvas.history': PropTypes.array.isRequired,
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['undo'];

class UndoButton extends React.Component {
  isDisabled() {
    return this.props.history.length === 0 || this.props.isPlaying;
  }
  render() {
    return (
      <PaletteButton
        caption="undo"
        disabled={this.isDisabled()}
        onClick={this.props.actions.undo} />
    );
  }
}
UndoButton.displayName = 'UndoButton';

export default allInOne(UndoButton, null, props, actions);
