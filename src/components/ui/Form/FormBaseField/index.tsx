import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './FormBaseField.module.scss';
import { v4 as uuid } from 'uuid';

interface FormBaseFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  error?: string;
}

export const FormBaseField = forwardRef<HTMLInputElement, FormBaseFieldProps>(
  (props, ref) => {
    const {
      value = '',
      label = 'Default label',
      placeholder = 'Default placeholder',
      error,
      onChange,
      ...otherProps
    } = props;
    const fieldId = props.id || uuid();

    return (
      <div className={`${styles.formBaseField} ${error && styles.error}`}>
        <div className={styles.inner}>
          <input
            id={fieldId}
            className={styles.input}
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...otherProps}
          />
          <label htmlFor={fieldId} className={styles.label}>
            {label}
          </label>
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
