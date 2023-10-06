import { FC, useEffect } from 'react';
import { HomePage } from '~/pages/HomePage';

import { getToken } from './services/axios';
import { setSessionToken } from './utils';

const App: FC = () => {
  useEffect(() => {
    async function writeSessionToken() {
      try {
        const response = await getToken();

        if (response.success === false && response.message) {
          throw new Error(response.message);
        }

        setSessionToken(response.token);
      } catch (error) {
        console.error(error);
      }
    }

    writeSessionToken();
  }, []);

  return <HomePage />;
};

export default App;
