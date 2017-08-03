import { UPDATE_THUMBNAIL } from '@actions/const';

function action(originalId, thumbnail) {
  return { type: UPDATE_THUMBNAIL, originalId, thumbnail };
}

module.exports = action;
