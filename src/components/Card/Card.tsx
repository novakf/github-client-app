import React from 'react';
import classNames from 'classnames';
import Text from '../Text';
import './styles.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  let {
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    actionSlot,
    ...other
  } = props;

  return (
    <div className={classNames(className, 'card')} {...other}>
      <img alt='img' src={image} />
      <div className="content">
        <div className="text-content">
          {captionSlot && (
            <Text view="p-14" className="caption">
              {captionSlot}
            </Text>
          )}
          <Text maxLines={2} className="card-title">
            {title}
          </Text>
          <Text maxLines={3} className="card-subtitle">
            {subtitle}
          </Text>
        </div>
        <div className="action">
          {contentSlot && <Text className="action-content">{contentSlot}</Text>}
          {actionSlot && (
            <div className="button">
              {actionSlot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
