import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/player.cssmodule.styl';
import CurrentTiming from '@components/frames/CurrentTiming';
import allInOne from '@utils/allInOne';

const props = {
  'player.isPlaying': PropTypes.bool.isRequired,
  'player.joinedImage': PropTypes.object.isRequired,
  'player.duration': PropTypes.number.isRequired,
  'player.easing': PropTypes.string.isRequired
};

class Player extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.state = { timing: 0 };
    this.animation = null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.isPlaying && !prevProps.isPlaying) {
      this.animate();
    }
    if (this.props.isPlaying && this.props.joinedImage !== prevProps.joinedImage) {
      if (this.animation) this.animation.cancel();
      this.animate();
    }
    if (!this.props.isPlaying && this.animation) {
      this.animation.cancel();
    }
    if (this.props.isPlaying) {
      if (this.props.duration !== prevProps.duration) {
        this.animation.effect.timing.duration = this.getDuration();
      }
      if (this.props.easing !== prevProps.easing) {
        this.animation.effect.timing.easing = this.props.easing;
      }
    }
  }
  getDuration() {
    return this.props.duration * this.props.joinedImage.frameCount;
  }
  getStyle() {
    return {
      display: this.props.isPlaying ? 'block' : 'none',
      backgroundImage: `url(${this.props.joinedImage})`
    };
  }
  animate() {
    this.element.style.backgroundImage = `url(${this.props.joinedImage.image})`;
    const keyframes = [
      {
        backgroundPositionX: '0px',
        easing: `frames(${this.props.joinedImage.frameCount})`
      },
      {
        backgroundPositionX: `-${(this.props.joinedImage.frameCount - 1) * this.props.joinedImage.width}px`
      }
    ];
    this.animation = this.element.animate(keyframes, {
      duration: this.getDuration(),
      easing: this.props.easing,
      iterations: Infinity,
    });
    this.tick();
  }
  tick = () => {
    if (this.props.isPlaying) {
      requestAnimationFrame(this.tick);
    }
    this.setState({ timing: this.animation.effect.getComputedTiming().progress });
  }
  render() {
    return (
      <div
        styleName="player"
        style={this.getStyle()}
        ref={element => { this.element = element; }}>
        <CurrentTiming timing={this.state.timing} />
      </div>
    );
  }
}

export default allInOne(Player, styles, props);
