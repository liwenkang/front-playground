import { useRoutes, Link, Outlet } from 'react-router-dom';
import VerticalLine from '../../pages/components/VerticalLine';
import Jest from './jest';
import ReactQuery from './react-query';
import Redux from './redux';

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
            <li>
              <Link to='/code/redux'>redux</Link>
            </li>
          </ul>
        </nav>

        <VerticalLine />

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
        {
          path: '/redux/*',
          element: <Redux />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
