import React from 'react';
import PropTypes from 'prop-types';
import Easing from '@components/frames/Easing';
import styles from '@components/frames/duration.cssmodule.styl';
import config from '@config';
import allInOne from '@utils/allInOne';

const props = {
  'player.duration': PropTypes.number.isRequired
};
const actions = ['updateDuration'];

class PlayerController extends React.Component {
  increment = () => {
    this.props.actions.updateDuration(this.props.duration + config.durationStep);
  }
  decrement = () => {
    this.props.actions.updateDuration(this.props.duration - config.durationStep);
  }
  isDisabled() {
    return this.props.duration - config.durationStep <= 0;
  }
  render() {
    return (
      <div styleName="duration">
        <button onClick={this.decrement} disabled={this.isDisabled()}>←</button>
        <Easing />
        <button onClick={this.increment}>→</button>
      </div>
    );
  }
}

export default allInOne(PlayerController, styles, props, actions);
