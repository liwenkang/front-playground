import { Link, Outlet, useRoutes } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import VerticalLine from '../../../pages/components/VerticalLine';

interface ReactMarkdownDTO {
  path: string;
  name: string;
  element: JSX.Element;
}

export default () => {
  const _getReactMarkdownArray: () => ReactMarkdownDTO[] = () => {
    const Mixins = import.meta.glob(`../../../pages/markdown/article/*.md`, {
      as: 'raw',
    });
    const result: ReactMarkdownDTO[] = [];
    Object.keys(Mixins).map((path) => {
      const fileNameArray = path.match(/([^\\/]+)\.([^\\/]+)/);
      if (fileNameArray) {
        const name = fileNameArray[1];
        const context: string = Mixins[path] as unknown as string;
        result.push({
          path: `/markdown/article/${name}`,
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
      <div style={{ display: 'flex' }}>
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

        <VerticalLine />

        <Outlet />
      </div>
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
