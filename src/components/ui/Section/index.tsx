import { FC, ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  title?: string;
  id?: string;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({ children, title, id }) => {
  return (
    <div className={styles.section} id={id}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
