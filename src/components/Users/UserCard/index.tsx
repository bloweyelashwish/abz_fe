import { FC } from 'react';
import styles from './UserCard.module.scss';
import { Image } from '~/components/ui/Image';
import { Tooltip } from '~/components/ui/Tooltip';

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

export const UserCard: FC<UserCardProps> = (props) => {
  const { name, email, phone, position, photo, id } = props;
  const nameTooltipId = `tooltip-${name}-${id}`;
  const positionTooltipId = `tooltip-${position}-${id}`;

  return (
    <article className={styles.userCard}>
      <div className={styles.avatar}>
        <Image src={photo} alt={name} />
      </div>
      <div className={styles.info}>
        <p className={styles.name} data-tooltip-id={nameTooltipId}>
          {name}
        </p>
        <Tooltip id={nameTooltipId} content={name} place="bottom" />
        <div className={styles.additionalInfo}>
          <p data-tooltip-id={positionTooltipId}>{position}</p>
          <Tooltip id={positionTooltipId} content={position} place="bottom" />
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
    </article>
  );
};
