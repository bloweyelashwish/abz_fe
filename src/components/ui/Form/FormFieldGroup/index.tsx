import { FC, ReactNode } from 'react';
import styles from './FormFieldGroup.module.scss';

interface FormFieldGroupProps {
  title: string;
  error?: string;
  children: ReactNode;
}

export const FormFieldGroup: FC<FormFieldGroupProps> = (props) => {
  const { title, children, error } = props;

  return (
    <div className={styles.formFieldGroup}>
      <p className={styles.title}>{title}</p>
      <div className={styles.group}>{children}</div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
