import React from 'react';
import { Outlet, Link, useRoutes } from 'react-router-dom';
import Record from './markdown/record/index';
import Article from './markdown/article/index';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/article'>article</Link>
          </li>
          <li>
            <Link to='/record'>record</Link>
          </li>
          <li>
            <Link to='/code'>code</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function NoMatch() {
  return <div>啥也没找到</div>;
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/article',
        element: <Article />,
      },
      {
        path: '/record/*',
        element: <Record />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

export default () => useRoutes(routes);
