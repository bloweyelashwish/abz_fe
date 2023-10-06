import { ButtonHTMLAttributes, ElementType, FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  href?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { onClick, text, href, ...otherProps } = props;
  const Tag: ElementType = href ? 'a' : 'button';

  return (
    <Tag
      onClick={onClick}
      className={styles.button}
      {...(Tag === 'button' && { type: otherProps.type || 'button' })}
      {...(Tag === 'button' && { disabled: otherProps.disabled ?? false })}
      {...(Tag === 'a' && { href })}
      {...otherProps}
    >
      <span>{text}</span>
    </Tag>
  );
};
