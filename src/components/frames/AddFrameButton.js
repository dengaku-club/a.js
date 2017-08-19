import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/addframebutton.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired
};
const actions = ['addFrame'];

class AddFrameButton extends React.Component {
  isDisabled() {
    return this.props.isPlaying;
  }
  render() {
    return (
      <button
        styleName="button"
        disabled={this.isDisabled()}
        onClick={this.props.actions.addFrame}>add-frame</button>
    );
  }
}

AddFrameButton.displayName = 'AddFrameButton';
AddFrameButton.defaultProps = {};

export default allInOne(AddFrameButton, styles, props, actions);
