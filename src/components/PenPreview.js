import React from 'react';
import PropTypes from 'prop-types';
import styles from '@components/penpreview.cssmodule.styl';
import config from '@config';
import allInOne from '@utils/allInOne';

const props = {
  'palette.lineWidth': PropTypes.number.isRequired,
  'palette.color': PropTypes.string.isRequired
};

class PenPreview extends React.Component {
  constructor(componentProps) {
    super(componentProps);
    this.state = { isShowing: false };
    this.timeoutId = null;
  }
  componentWillUpdate(nextProps) {
    if (nextProps.lineWidth !== this.props.lineWidth &&
        !this.state.isShowing) {
      this.show();
    }
  }
  computedSize() {
    return this.props.lineWidth;
  }
  computedStyleForSvg() {
    return {
      width: `${this.computedSize()}px`,
      height: `${this.computedSize()}px`
    };
  }
  computedStyleForCircle() {
    return {
      fill: this.props.color
    };
  }
  computedStyleName() {
    return `svg${(this.state.isShowing ? ' visible' : '')}`;
  }
  show() {
    this.setState({
      isShowing: true
    });
  }
  hide = () => {
    this.setState({
      isShowing: false
    });
  }
  render() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(this.hide, config.penPreviewTimeout);
    return (
      <svg
        viewBox="0 0 1 1"
        styleName={this.computedStyleName()}
        style={this.computedStyleForSvg()}>

        <circle cx="0.5" cy="0.5" r="0.5" style={this.computedStyleForCircle()} />
      </svg>
    );
  }
}

PenPreview.displayName = 'PenPreview';
PenPreview.defaultProps = {};

export default allInOne(PenPreview, styles, props, [], {
  allowMultiple: true
});
