import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostsRQ = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:3001/posts");
    },
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    enabled: true,
  });

  if (isLoading) {
    return <div>Page is loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <div className='post-list'>
      {/* <button onClick={refetch}>Fetch posts</button> */}
      {data?.data?.map((post, index) => (
        <Link to={`/rq-posts/${post.id}`} key={index}>
          <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostsRQ;