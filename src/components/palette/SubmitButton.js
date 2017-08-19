import React from 'react';
import PropTypes from 'prop-types';
import PaletteButton from '@components/palette/PaletteButton';
import submit from '@utils/submit';
import allInOne from '@utils/allInOne';

const props = {
  'player.duration': PropTypes.number.isRequired,
  'player.joinedImage': PropTypes.object.isRequired,
  'player.easing': PropTypes.string.isRequired,
};

class SubmitButton extends React.Component {
  onClick() {
    submit(this.props.joinedImage, this.props.duration, this.props.easing);
  }
  isDisabled() {
    return !this.props.joinedImage.blob;
  }
  render() {
    return (
      <PaletteButton
        caption="submit"
        disabled={this.isDisabled()}
        onClick={() => this.onClick()} />
    );
  }
}

SubmitButton.displayName = 'SubmitButton';

export default allInOne(SubmitButton, null, props);
