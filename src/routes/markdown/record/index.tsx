import { Routes, Route, Link, Outlet } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const _getReactMarkdownArray: () => {
    name: string;
    element: JSX.Element;
  }[] = () => {
    const Mixins = import.meta.glob('../../../pages/markdown/record/*.md', {
      as: 'raw',
    });
    const result: { name: string; element: JSX.Element }[] = [];
    Object.keys(Mixins).map((key) => {
      const fileNameArray = key.match(/[^/]+$/);
      if (fileNameArray) {
        const fileName = fileNameArray[0];
        const context: string = Mixins[key] as unknown as string;
        result.push({
          name: fileName,
          element: <ReactMarkdown>{context}</ReactMarkdown>,
        });
      }
    });
    return result;
  };

  const reactMarkdownArray = _getReactMarkdownArray();

  function Record() {
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

  return (
    <Routes>
      <Route
        path='/'
        element={<Record />}
      >
        {reactMarkdownArray.map((item) => (
          <Route
            key={item.name}
            path={item.name}
            element={item.element}
          ></Route>
        ))}
      </Route>
    </Routes>
  );
}
