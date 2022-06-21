import { useRoutes, Link, Outlet } from 'react-router-dom';
import Jest from './jest';
import ReactQuery from './react-query';

export default () => {
  function Layout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/code/jest'>jest</Link>
            </li>
            <li>
              <Link to='/code/react-query'>react-query</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Outlet />
      </div>
    );
  }

  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/jest/*',
          element: <Jest />,
        },
        {
          path: '/react-query/*',
          element: <ReactQuery />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
