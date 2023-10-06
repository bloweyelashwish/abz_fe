import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './FormImageField.module.scss';
import { v4 as uuid } from 'uuid';

interface FormImageFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormImageField = forwardRef<HTMLInputElement, FormImageFieldProps>(
  (props, ref) => {
    const { label, onChange, error, placeholder, ...otherProps } = props;
    const fieldUid = otherProps?.id || uuid();

    return (
      <div className={`${styles.formImageField} ${error && styles.error}`}>
        <label htmlFor={fieldUid} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          <input
            type="file"
            accept="image/jpeg"
            onChange={onChange}
            id={fieldUid}
            ref={ref}
            className={styles.input}
            {...otherProps}
          />
          <span className={styles.valueHolder}>
            <span className={styles.placeholder}>{placeholder}</span>
          </span>
        </label>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
