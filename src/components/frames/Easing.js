import React from 'react';
import BezierEasingEditor from 'bezier-easing-editor';
import styles from '@components/frames/easing.cssmodule.styl';
import allInOne from '@utils/allInOne';

const actions = ['updateEasing'];

class Easing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  getStyle() {
    return {
      display: this.state.isShow ? 'block' : 'none'
    };
  }
  change = value => {
    this.props.actions.updateEasing(`cubic-bezier(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`);
  }
  toggle = () => {
    this.setState({ isShow: !this.state.isShow });
  }
  render() {
    return (
      <div styleName="easing">
        <button styleName="easing-button" onClick={this.toggle}>E</button>
        <BezierEasingEditor
          onFinish={this.change}
          styleName="easing-editor"
          style={this.getStyle()} />
      </div>
    );
  }
}

export default allInOne(Easing, styles, {}, actions);
