import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/frames/currenttiming.cssmodule.styl';
import config from '@config';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'canvas.frames': PropTypes.array.isRequired
};

class CurrentTiming extends React.Component {
  getLeft() {
    return `${this.props.timing * config.thumbnailWidth * this.props.frames.length}px`;
  }
  getStyle() {
    return {
      left: this.getLeft()
    };
  }
  render() {
    return (
      <div styleName="timing" style={this.getStyle()} />
    );
  }
}

CurrentTiming.propTypes = {
  timing: PropTypes.number
};

export default allInOne(CurrentTiming, styles, props);
