import React, { useEffect, useRef, useState } from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Input from '../Input';
import './styles.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  let { className, options, value, disabled, onChange, getTitle, ...other } = props;

  const [myOptions, setMyOptions] = useState(options);

  useEffect(() => {
    setMyOptions(options);
  }, [options]);

  let [listIsOpen, setListIsOpen] = useState(false);

  const changeCurrentOptions = (option: Option) => {
    let fl = false;

    value.forEach((val) => {
      if (val.value === option.value) fl = true;
    });

    let newValue: Option[] = [];

    if (fl) {
      value.forEach((val) => {
        if (val.value !== option.value) newValue.push(val);
      });
    } else {
      if (value.length === 0) newValue = [option];
      else newValue = [...value, option];
    }

    onChange(newValue);
  };

  const selectRef = useRef(null);

  const useClickHandler = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setListIsOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useClickHandler(selectRef);

  const activeClass = (option: Option) => {
    return value.find((val) => option.key === val.key) ? 'option-active' : '';
  };

  return (
    <div ref={selectRef} className={`select ${className}`} {...other}>
      <Input
        onClick={() => !disabled && setListIsOpen(true)}
        disabled={disabled}
        value={value.length !== 0 && !listIsOpen ? getTitle(value) : ''}
        onChange={() => {}}
        placeholder={getTitle(value)}
        afterSlot={
          <ArrowDownIcon className="drop-icon" color="secondary" onClick={() => !disabled && setListIsOpen(true)} />
        }
      />
      {listIsOpen && !disabled && (
        <div className="dropdown-menu">
          {myOptions.map((option) => (
            <div
              key={option.key}
              className={`option ${activeClass(option)}`}
              onClick={() => {
                changeCurrentOptions(option);
              }}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
