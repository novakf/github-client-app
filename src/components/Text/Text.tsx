import * as React from 'react';
import classNames from 'classnames';
import './styles.css';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ tag: Tag = 'p', ...props }) => {
  const element = document.getElementsByClassName('text')[0] as HTMLElement;

  if (props.maxLines) {
    element?.style.setProperty('--maxline-count', props.maxLines.toString());
  }

  const className = classNames(
    'text',
    props.className,
    props.color,
    props.view,
    props.weight,
    'maxLines'
  );

  return <Tag className={className}>{props.children}</Tag>;
};

export default Text;
