import { FC, ReactNode } from 'react';
import { Header } from '~/components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="page">
      <div className="page__header">
        <Header />
      </div>
      <main className="page__main">{children}</main>
    </div>
  );
};
