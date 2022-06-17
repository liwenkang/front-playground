import { Link, Outlet, useRoutes } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

export default () => {
  /**
   * @param relativeUrl 读取 markdown 文件的相对路径
   * @returns {name: 文件名称, element: ReactMarkdown}[]
   */
  const _getReactMarkdownArray: () => {
    name: string;
    element: JSX.Element;
  }[] = () => {
    const Mixins = import.meta.glob('../../../pages/markdown/record/*.md', {
      as: 'raw',
    });
    const result: { name: string; element: JSX.Element }[] = [];
    Object.keys(Mixins).map((path) => {
      const fileNameArray = path.match(/([^\\/]+)\.([^\\/]+)/);
      if (fileNameArray) {
        const name = fileNameArray[1];
        const context: string = Mixins[path] as unknown as string;
        result.push({
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
                  to={`/record/${item.name}`}
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
