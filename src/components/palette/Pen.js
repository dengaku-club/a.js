import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/palette/pen.cssmodule.styl';
import allInOne from '@utils/allInOne';

const props = {
  'palette.color': PropTypes.string.isRequired
};
const actions = ['changeColor'];

class Pen extends React.Component {
  changeColor = () => {
    this.props.actions.changeColor(this.props.originalColor);
  }
  computedStyle() {
    return {
      backgroundColor: this.props.originalColor
    };
  }
  computedStyleName() {
    return `pen${(this.props.originalColor === this.props.color ? ' pen-active' : '')}`;
  }
  render() {
    return (
      <div
        style={this.computedStyle()}
        styleName={this.computedStyleName()}
        onMouseDown={this.changeColor} />
    );
  }
}

Pen.displayName = 'Pen';
Pen.propTypes = {
  originalColor: PropTypes.string.isRequired
};

export default allInOne(Pen, styles, props, actions, {
  allowMultiple: true
});
