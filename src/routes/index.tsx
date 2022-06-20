import React from 'react';
import { Outlet, Link, useRoutes } from 'react-router-dom';
import Code from './code';
import Markdown from './markdown';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/code'>code</Link>
          </li>
          <li>
            <Link to='/markdown'>markdown</Link>
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
        path: '/markdown/*',
        element: <Markdown />,
      },
      {
        path: '/code/*',
        element: <Code />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

export default () => useRoutes(routes);
