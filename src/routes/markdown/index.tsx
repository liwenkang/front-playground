import React from 'react';
import { useRoutes, Link, Outlet } from 'react-router-dom';
import Article from './article';
import Record from './record';

export default () => {
  function Layout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/markdown/article'>article</Link>
            </li>
            <li>
              <Link to='/markdown/record'>record</Link>
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
          path: '/article/*',
          element: <Article />,
        },
        {
          path: '/record/*',
          element: <Record />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
