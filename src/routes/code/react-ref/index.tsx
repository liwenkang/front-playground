import { useRoutes } from 'react-router-dom';
import ReactRef from '../../../pages/code/react-ref';

export default () => {
  const routes = [
    {
      path: '/',
      element: <ReactRef />,
    },
  ];

  return useRoutes(routes);
};
