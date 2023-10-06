import { Hero } from '~/components/Hero';
import { UserList, UserForm } from '~/components/Users';
import { Section } from '~/components/ui/Section';
import { UserListProvider } from '~/contexts/userListContext';
import { MainLayout } from '~/layouts/MainLayout';

export const HomePage = () => {
  return (
    <MainLayout>
      <Hero
        title="Test assignment for front-end developer"
        description="What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving."
      />
      <UserListProvider>
        <Section title="Working with GET request" id="users">
          <UserList />
        </Section>
        <Section title="Working with POST request" id="sign-up">
          <UserForm />
        </Section>
      </UserListProvider>
    </MainLayout>
  );
};
