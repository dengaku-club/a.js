/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import moveFrame from '@actions/moveFrame.js';
import updateThumbnail from '@actions/updateThumbnail.js';
import removeFrame from '@actions/removeFrame.js';
import changeCurrentFrame from '@actions/changeCurrentFrame.js';
import addFrame from '@actions/addFrame.js';
import undo from '@actions/undo.js';
import addLine from '@actions/addLine.js';
import changeLineWidth from '@actions/changeLineWidth.js';
import changeColor from '@actions/changeColor.js';
import clearCanvas from '@actions/clearCanvas.js';
import togglePlay from '@actions/togglePlay.js';
import updateJoinedImage from '@actions/updateJoinedImage.js';
import updateDuration from '@actions/updateDuration.js';
import requestUpdateThumbnail from '@actions/requestUpdateThumbnail.js';
import changeSize from '@actions/changeSize.js';
import updateEasing from '@actions/updateEasing.js';

const actions = {
  addLine,
  changeColor,
  changeLineWidth,
  clearCanvas,
  undo,
  addFrame,
  changeCurrentFrame,
  removeFrame,
  updateThumbnail,
  moveFrame,
  togglePlay,
  updateJoinedImage,
  updateDuration,
  requestUpdateThumbnail,
  changeSize,
  updateEasing
};
module.exports = actions;
