import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import './styles.css';

const CheckIcon: React.FC<IconProps> = (props) => {
  let { color, ...other } = props;

  let fillColor;
  if (color === 'accent') {
    fillColor = '#518581';
  } else if (color === 'secondary') {
    fillColor = '#AFADB5';
  } else fillColor = '#000000';

  return (
    <Icon {...other}>
      <path
        d="M4 11.6129L9.87755 18L20 7"
        stroke={fillColor}
        stroke-width="2"
      />
    </Icon>
  );
};

export default CheckIcon;
