import { useRoutes } from 'react-router-dom';
import Redux from '../../../pages/code/redux';

export default () => {
  const routes = [
    {
      path: '/',
      element: <Redux />,
    },
  ];

  return useRoutes(routes);
};
