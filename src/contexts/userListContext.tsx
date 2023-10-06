import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import type { ApiUser } from '~/types';

interface IUserListContext {
  userList: ApiUser[];
  defineUserList: (userList: ApiUser[]) => void;
}

const UserListContext = createContext<IUserListContext | null>(null);

export function useUserList() {
  const context = useContext(UserListContext);
  if (!context) {
    throw new Error('useUserList must be used within a UserListProvider');
  }

  return context;
}

export function UserListProvider({ children }: { children: ReactNode }) {
  const [userList, setUserList] = useState<ApiUser[]>([]);

  function sortUserList(userList: ApiUser[]) {
    return userList.sort(
      (a, b) => b.registration_timestamp - a.registration_timestamp
    );
  }

  const defineUserList = useCallback((userList: ApiUser[]) => {
    return setUserList(sortUserList(userList));
  }, []);

  return (
    <UserListContext.Provider value={{ userList, defineUserList }}>
      {children}
    </UserListContext.Provider>
  );
}
