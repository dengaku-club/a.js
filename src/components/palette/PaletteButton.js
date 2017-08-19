import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from '@components/palette/palettebutton.cssmodule.styl';

class PaletteButton extends React.Component {
  click = () => {
    this.props.onClick();
  }
  render() {
    return (
      <button
        styleName="button"
        disabled={this.props.disabled}
        onClick={this.click}>{this.props.caption}</button>
    );
  }
}

PaletteButton.displayName = 'PaletteButton';
PaletteButton.propTypes = {
  disabled: PropTypes.bool,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
PaletteButton.defaultProps = {};

export default cssmodules(PaletteButton, styles);
