import { useRoutes } from 'react-router-dom';
import ReactQuery from '../../../pages/code/react-query';

export default () => {
  const routes = [
    {
      path: '/',
      element: <ReactQuery />,
    },
  ];

  return useRoutes(routes);
};
