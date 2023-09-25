import React from 'react';
import './styles.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className, ...other }) => {
  if (!size) size = 'l';

  return <div className={`${className} ${size}`} {...other}></div>;
};

export default Loader;
