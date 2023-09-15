import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import './styles.css';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
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
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={fillColor}
      />
    </Icon>
  );
};

export default ArrowDownIcon;
