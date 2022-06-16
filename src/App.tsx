import { useRoutes } from 'react-router-dom';
import routes from './routes';

export default function App() {
  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  const element = useRoutes(routes);

  return (
    <div>
      <h1>Front Playground</h1>

      {element}
    </div>
  );
}
