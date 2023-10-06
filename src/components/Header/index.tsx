import styles from './Header.module.scss';
import logo from '~/assets/logo.svg';
import { Button } from '~/components/ui/Button';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={logo} alt="ABZ Test logo" />
        </div>
        <div className={styles.actions}>
          <Button text="Users" href="#users" />
          <Button text="Sign up" href="#sign-up" />
        </div>
      </div>
    </header>
  );
};
