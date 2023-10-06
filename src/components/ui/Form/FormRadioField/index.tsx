import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './FormRadioField.module.scss';
import { v4 as uuid } from 'uuid';

interface FormRadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormRadioField = forwardRef<HTMLInputElement, FormRadioFieldProps>(
  (props, ref) => {
    const { name, label, error, ...otherProps } = props;

    const fieldUid = otherProps.id || uuid();

    return (
      <div className={styles.formRadioField}>
        <div className={styles.inner}>
          <input
            type="radio"
            name={name}
            id={fieldUid}
            ref={ref}
            {...otherProps}
            className={styles.input}
          />
          <label htmlFor={fieldUid} className={styles.label}>
            {label}
          </label>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);
