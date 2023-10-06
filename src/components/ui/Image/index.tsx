import { FC } from 'react';
import styles from './Image.module.scss';
import fallbackImage from '~/assets/photo-cover.svg';

interface ImageProps {
  src: string;
  alt: string;
}

export const Image: FC<ImageProps> = (props) => {
  const { src, alt = 'Default image alt', ...otherProps } = props;

  return (
    <picture className={styles.picture}>
      <img
        src={src ?? fallbackImage}
        alt={alt}
        {...otherProps}
        className={styles.image}
      />
    </picture>
  );
};
