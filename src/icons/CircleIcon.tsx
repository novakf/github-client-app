import React, { SVGAttributes } from 'react';

const CircleIcon: React.FC<SVGAttributes<SVGElement>> = ({ fill, ...other }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...other}>
      <circle cx="8" cy="8" r="8" fill={fill} />
    </svg>
  );
};

export default CircleIcon;
