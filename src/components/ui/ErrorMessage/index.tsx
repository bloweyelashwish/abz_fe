import { FC } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <h3 className={styles.text}>{message}</h3>
    </div>
  );
};
