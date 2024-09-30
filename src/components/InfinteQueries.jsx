import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

import { useInView } from "react-intersection-observer";


const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:3001/fruits/?_limit=10&_page=${pageParam}`);
}

const InfinteQueries = () => {
  const { ref, inView } = useInView();

  // useInfiniteQuery implementation
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 5) {
        return allPages.length + 1
      }
      else {
        return undefined;
      }
    }
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <h2>Page is Loading...</h2>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <div>
      {data?.pages?.map(page => {
        return (page?.data.map(fruit => {
          return (
            <div key={fruit.id} className='fruit-item'>
              {fruit.name}
            </div>
          )
        }))
      })}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>

      {/* <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More...</button> */}
    </div>
  )
}

export default InfinteQueries;
