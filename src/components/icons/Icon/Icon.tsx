import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | string;
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  let { width, height, ...other } = props;

  if (!width) width = 24;
  if (!height) height = 24;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...other}
    >
      {props.children}
    </svg>
  );
};

export default Icon;
