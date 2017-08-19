import React from 'react';
import UndoButton from '@components/palette/UndoButton';
import ClearCanvasButton from '@components/palette/ClearCanvasButton';
import SubmitButton from '@components/palette/SubmitButton';
import LineWidth from '@components/palette/LineWidth';
import Pen from '@components/palette/Pen';
import styles from '@components/palette/palette.cssmodule.styl';
import colors from '@utils/colors';
import allInOne from '@utils/allInOne';

class Palette extends React.Component {
  render() {
    return (
      <div styleName="palette">
        {
          colors.map((color, index) =>
            <Pen
              key={index}
              originalColor={color} />
          )
        }
        <LineWidth />
        <UndoButton />
        <ClearCanvasButton />
        <SubmitButton />
      </div>
    );
  }
}

Palette.displayName = 'Palette';
Palette.propTypes = {};
Palette.defaultProps = {};

export default allInOne(Palette, styles);
