import React from 'react';
import PropTypes from 'prop-types';
import FrameItem from '@components/frames/FrameItem';
import AddFrameButton from '@components/frames/AddFrameButton';
import PlayButton from '@components/frames/PlayButton';
import PlayerController from '@components/frames/PlayerController';
import styles from '@components/frames/frames.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'canvas.frames': PropTypes.array.isRequired,
};

class Frames extends React.Component {
  render() {
    return (
      <div styleName="frames">
        <div styleName="player-controller">
          <PlayButton />
          <PlayerController />
        </div>
        {
          this.props.frames.map((frame, index) =>
            <FrameItem
              key={index}
              id={frame.id} />
          )
        }
        <AddFrameButton />
      </div>
    );
  }
}

Frames.displayName = 'Frames';
Frames.defaultProps = {};

export default allInOne(Frames, styles, props);
