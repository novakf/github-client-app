import classNames from 'classnames';
import React from 'react';
import './styles.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  let { loading, children, onClick, disabled, className, ...other } = props;

  var btnClass = classNames({
    'btn-loading': loading,
    'btn-disabled': disabled,
  });

  return (
    <button
      className={`${btnClass} ${className}`}
      onClick={(e) => onClick?.(e)}
      disabled={disabled || loading}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
