import { useRoutes } from 'react-router-dom';
import Jest from '../../../pages/code/jest';

export default () => {
  const routes = [
    {
      path: '/',
      element: <Jest />,
    },
  ];

  return useRoutes(routes);
};
