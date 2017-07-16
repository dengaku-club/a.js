import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeColor, changeWidth } from '../actions/';
import Main from '../components/Palette';

export class Palette extends Component {
  render() {
    return <Main actions={this.props.actions} palette={this.props.palette} />;
  }
}

Palette.propTypes = {
  actions: PropTypes.shape({
    changeColor: PropTypes.func.isRequired,
    changeWidth: PropTypes.func.isRequired
  }),
  palette: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return { palette: state.palette };
}

export function mapDispatchToProps(dispatch) {
  const actions = { changeColor, changeWidth };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);
