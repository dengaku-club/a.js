import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from '@components/frameitem.cssmodule.styl';

class FrameItem extends React.Component {
  getBackgroundImage() {
    if (this.props.currentIndex === this.props.index) {
      return '-moz-element(#canvas)';
    }
    if (this.props.thumbnail) {
      return `url(${this.props.thumbnail})`;
    }
    return 'none';
  }
  styles() {
    const classes = ['frame-item'];
    if (this.props.currentIndex === this.props.index) {
      classes.push('active');
    }
    return classes.join(' ');
  }
  css() {
    return {
      backgroundImage: this.getBackgroundImage()
    };
  }
  dragStart = event => {
    event.dataTransfer.setData('index', this.props.index);
  }
  allowDrop = event => {
    event.preventDefault();
  }
  drop = event => {
    event.preventDefault();
    this.props.onMove(parseInt(event.dataTransfer.getData('index')), this.props.index);
  }
  change = () => {
    this.props.onChange(this.props.index);
  }
  remove = event => {
    event.stopPropagation();
    this.props.onRemove(this.props.index);
  }
  render() {
    return (
      <div
        styleName={this.styles()}
        onClick={this.change}
        style={this.css()}
        draggable="true"
        onDragStart={this.dragStart}
        onDragOver={this.allowDrop}
        onDrop={this.drop}>
        <button styleName="remove-button" onClick={this.remove}>×</button>
      </div>
    );
  }
}

FrameItem.displayName = 'FrameItem';
FrameItem.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired
};
FrameItem.defaultProps = {};

export default cssmodules(FrameItem, styles, {
  allowMultiple: true
});
