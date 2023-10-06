import { FC, useCallback, useEffect, useState } from 'react';
import { getUsers } from '~/services/axios';
import type { AxiosError } from 'axios';
import { UserCard } from '../UserCard';

import styles from './UserList.module.scss';
import { Button } from '~/components/ui/Button';
import { Preloader } from '~/components/ui/Preloader';
import { ErrorMessage } from '~/components/ui/ErrorMessage';
import { useUserList } from '~/contexts/userListContext';

export const UserList: FC = () => {
  const { userList, defineUserList } = useUserList();
  const [error, setError] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUploadLink, setNextUploadLink] = useState('?page=1&count=6');

  const userFetcher = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUsers(nextUploadLink);
      if (response.success === false && response.message) {
        setError(response.message);
      }

      const {
        users,
        links: { next_url },
      } = response;

      if (!next_url) {
        setCanLoadMore(false);
        return;
      }

      const { page, total_pages } = response;

      if (page === total_pages) {
        setCanLoadMore(false);
      }

      const [_, nextLink] = next_url.split('?');
      defineUserList(userList.concat(users));
      setNextUploadLink(`?${nextLink}`);
    } catch (error) {
      const apiError = error as AxiosError | Error;

      setError(apiError.message ?? 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [defineUserList, nextUploadLink, userList]);

  useEffect(() => {
    userFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadMoreUsers() {
    userFetcher();
  }

  return (
    <div className={styles.userListWrapper}>
      {error && (
        <div className={styles.errorWrapper}>
          <ErrorMessage message={error ?? 'Something went wrong.'} />
        </div>
      )}
      {userList.length > 0 && (
        <ul className={styles.userList}>
          {userList.map((user) => (
            <li key={user.id}>
              <UserCard {...user} />
            </li>
          ))}
        </ul>
      )}
      {userList.length > 0 && !isLoading && canLoadMore && (
        <div className={styles.action}>
          <Button onClick={loadMoreUsers} text="Show more" />
        </div>
      )}
      {isLoading && (
        <div className={styles.action}>
          <Preloader />
        </div>
      )}
    </div>
  );
};
