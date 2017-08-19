import React from 'react';
import PropTypes from 'prop-types';
import allInOne from '@utils/allInOne';
import styles from '@components/palette/linewidth.cssmodule.styl';
import config from '@config';

const props = {
  'palette.lineWidth': PropTypes.number.isRequired
};
const actions = ['changeLineWidth'];

class LineWidth extends React.Component {
  changeLineWidth = event => {
    this.props.actions.changeLineWidth(parseInt(event.target.value));
  }
  render() {
    return (
      <div>
        <input
          type="range" styleName="slider" min="1" max={config.maxLineWidth}
          defaultValue={this.props.lineWidth}
          onChange={this.changeLineWidth} />
      </div>
    );
  }
}

LineWidth.displayName = 'LineWidth';
LineWidth.defaultProps = {};

export default allInOne(LineWidth, styles, props, actions);
