import { Link, Outlet, useRoutes } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

interface ReactMarkdownDTO {
  path: string;
  name: string;
  element: JSX.Element;
}

export default () => {
  const _getReactMarkdownArray: () => ReactMarkdownDTO[] = () => {
    const Mixins = import.meta.glob('../../../pages/markdown/record/*.md', {
      as: 'raw',
    });
    const result: ReactMarkdownDTO[] = [];
    Object.keys(Mixins).map((path) => {
      const fileNameArray = path.match(/([^\\/]+)\.([^\\/]+)/);
      if (fileNameArray) {
        const name = fileNameArray[1];
        const context: string = Mixins[path] as unknown as string;
        result.push({
          path: `/markdown/record/${name}`,
          name: name,
          element: (
            <div style={{ width: '60vw', margin: '0 auto' }}>
              <ReactMarkdown
                children={context}
                remarkPlugins={[remarkGfm, remarkToc]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              />
            </div>
          ),
        });
      }
    });
    return result;
  };

  const reactMarkdownArray = _getReactMarkdownArray();

  function Nav() {
    return (
      <>
        <nav>
          <ul>
            {reactMarkdownArray.map((item) => (
              <li>
                <Link
                  key={item.name}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Outlet />
      </>
    );
  }

  const routes = [
    {
      path: '/',
      element: <Nav />,
      children: reactMarkdownArray.map((item) => ({
        path: item.name,
        element: item.element,
      })),
    },
  ];

  return useRoutes(routes);
};
