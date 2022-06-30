import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery(['cats List'], () =>
    axios.get('/api/cats').then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    }),
  );

  if (isLoading) return <div>'Loading...';</div>;

  if (error) return <div>'An error has occurred: '</div>;

  return (
    <div>
      {data.map(
        (item: { age: string; breed: string; name: string; _id: string }) => (
          <div>
            <div>age: {item.age}</div>
            <div>breed: {item.breed}</div>
            <div>name: {item.name}</div>
          </div>
        ),
      )}
    </div>
  );
}
