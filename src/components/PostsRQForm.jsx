import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// GET Method
const fetchPosts = () => {
  return axios.get("http://localhost:3001/posts");
};

// Post Method
const addPost = (body) => {
  return axios.post("http://localhost:3001/posts", body);
};

const PostsRQForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  // useQuery Hook
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: true,
  });

  // useMutation Hook
  const { mutate } = useMutation({
    mutationFn: addPost,

    // Optimistic updates
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]); // 1. prevent race conditions, 2. ensure consistent state

      const previousPostData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }]
        }
      })

      return { previousPostData };
    },

    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.previousPostData)
    },

    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },

    // mutation response
    // onSuccess: (newData) => {
    //   queryClient.setQueryData(["posts"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data] 
    //     }
    //   })
    // }

    // query invalidation
    // onSuccess: () => {
    //   queryClient.invalidateQueries("posts");
    // }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    mutate(post);

    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Page is loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <div className='post-list'>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter post title'
          value={title}
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder='Enter post body'
          value={body}
        />
        <button type='submit'>Post</button>
      </form>


      {data?.data?.map((post, index) => (
        <Link to={`/rq-posts/${post.id}`} key={index}>
          <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
          </div>
        </Link>
      ))}
      <button onClick={refetch}>Fetch posts</button>
    </div>
  );
}

export default PostsRQForm;