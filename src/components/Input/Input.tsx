import React from 'react';
import classNames from 'classnames';
import './styles.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  let { value, onChange, afterSlot, className, placeholder, ...other } = props;

  return (
    <div className={classNames("input-container", className)}>
      <input
        type="text"
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...other}
      />
      {afterSlot && <div className="icon">{afterSlot}</div>}
    </div>
  );
});

export default Input;
