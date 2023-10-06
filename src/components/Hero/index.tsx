import { FC } from 'react';
import styles from './Hero.module.scss';
import banner from '~/assets/banner.webp';
import { Button } from '~/components/ui/Button';

interface HeroProps {
  title: string;
  description: string;
}

export const Hero: FC<HeroProps> = (props) => {
  const { title, description } = props;

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <img
          src={banner}
          alt="Test project banner image"
          className={styles.banner}
        />
      </div>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.action}>
          <Button text="Sign up" href="#sign-up" />
        </div>
      </div>
    </section>
  );
};
